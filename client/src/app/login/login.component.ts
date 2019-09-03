import { Component, Injectable, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {

  user = new User();

  constructor(private httpClient: HttpClient, private router: Router, private snackBar: MatSnackBar, private userService: UserService) {

  }

  ngOnInit() {

  }

  onLogin() {
    this.userService
      .queryUser(this.user)
      .subscribe(user => {
        if (user) {
          user.enabled = true;
          this.userService.user = user;
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['admin']);
        }
      }, err => {
        this.snackBar.open(err.error);
      });

  }

}
