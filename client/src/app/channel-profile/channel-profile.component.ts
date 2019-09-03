import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Group } from '../group';
import { UserService } from '../user.service';
import { Channel } from '../channel';
import { FormControl } from '@angular/forms';
import { GroupService } from '../group.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-channel-profile',
  templateUrl: './channel-profile.component.html',
  styleUrls: ['./channel-profile.component.css']
})
export class ChannelProfileComponent implements OnInit, AfterViewInit {

  allUsers: string[] = [];

  disable = false;

  userForm = new FormControl();
  selectedUsers: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private channel: Channel,
              private userService: UserService,
              private groupService: GroupService) { }

  ngAfterViewInit(): void {
    this.userService.allUser()
      .subscribe(users => {
        this.allUsers = users.map(user => user.username);
        this.selectedUsers = this.channel.users.filter(name => this.allUsers.indexOf(name) !== -1);
      });
    this.isAdmin();
  }

  ngOnInit() {
  }

  onUserOut() {
    this.channel.users = this.selectedUsers;
  }

  isAdmin() {
    if (!this.channel.name) {
      this.disable = true;
      return;
    }

    return this.groupService.getGroups()
      .subscribe((groups: Group[]) => {
          const group = this.findGroup(this.channel.groupName, groups[0]);
          if (!group) {
            return;
          }
          this.disable =
            !(group.admin.indexOf(this.userService.user.username) !== -1
              || group.assis.indexOf(this.userService.user.username) !== -1);
        }
      );
  }

  findGroup(name: string, group: Group): Group {
    if (name === group.name) {
      return group;
    }

    for (const subGroup of group.subGroup) {
      const result = this.findGroup(name, subGroup);
      if (result !== null) {
        return result;
      }
    }
    return null;
  }
}
