import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Channel } from '../channel';
import { GroupProfileComponent } from '../group-profile/group-profile.component';
import { Group } from '../group';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ChannelProfileComponent } from '../channel-profile/channel-profile.component';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'app-channel-management',
  templateUrl: './channel-management.component.html',
  styleUrls: ['./channel-management.component.css']
})
export class ChannelManagementComponent implements OnInit, AfterViewInit {

  channels: Channel[] = [];

  panelOpenState = false;

  constructor(private dialog: MatDialog, private channelService: ChannelService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.channelService.getChannels()
      .subscribe((channels) => {
        this.channels = channels.map(channel => Object.assign(new Channel(channel.name, channel.groupName), channel));
      });
  }

  openProfile(channel: Channel) {
    const dialogRef = this.dialog.open(ChannelProfileComponent, {
      width: '400px',
      // height: '400px',
      data: Object.assign(new Channel(channel.name, channel.groupName), channel),
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newChannel: Channel) => {
      if (!newChannel) {
        return;
      }

      newChannel.copyTo(channel);
      this.saveChannels();
    });
  }

  channelDialog() {
    const dialogRef = this.dialog.open(ChannelProfileComponent, {
      width: '400px',
      // height: '400px',
      data: Object.assign(new Channel('', '')),
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newChannel: Channel) => {
      if (!newChannel) {
        return;
      }

      this.channels = this.channels.concat(newChannel);
      this.saveChannels();
    });
  }

  private saveChannels() {
    this.channelService.saveChannels(this.channels)
      .subscribe(() => {
        this.snackBar.open('Successfully saved.');
      }, (error) => {
        this.snackBar.open(error.error);
      });
  }
}
