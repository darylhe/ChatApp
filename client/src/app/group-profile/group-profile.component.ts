import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Group } from '../group';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-group-profile',
  templateUrl: './group-profile.component.html',
  styleUrls: ['./group-profile.component.css']
})
export class GroupProfileComponent implements OnInit, AfterViewInit {

  allUsers: string[] = [];

  adminForm = new FormControl();
  selectedAdmins: string[] = [];

  assisForm = new FormControl();
  selectedAssis: string[] = [];

  userForm = new FormControl();
  selectedUser: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private group: Group, private userService: UserService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.userService.allUser()
      .subscribe(users => {
        this.allUsers = users.map(user => user.username);
        this.selectedAdmins = this.group.admin.filter(name => this.allUsers.indexOf(name) !== -1);
        this.selectedAssis = this.group.assis.filter(name => this.allUsers.indexOf(name) !== -1);
        this.selectedUser = this.group.users.filter(name => this.allUsers.indexOf(name) !== -1);
      });
  }

  onAdminOut() {
    this.group.admin = this.selectedAdmins;
  }

  onAssisOut() {
    this.group.assis = this.selectedAssis;
  }

  onUserOut() {
    this.group.users = this.selectedUser;
  }
}
