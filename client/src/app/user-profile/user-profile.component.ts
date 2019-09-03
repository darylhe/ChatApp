import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../user';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private user: User
  ) {
    if (!user) {
      this.user = new User();
    }
  }

  ngOnInit() {
  }

}
