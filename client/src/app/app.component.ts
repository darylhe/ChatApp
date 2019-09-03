import { Component, Injectable, OnInit } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {
  title = 'Chat System';

  constructor(protected router: Router, private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.user = Object.assign(new User(), JSON.parse(localStorage.getItem('user'))) || new User();
    if (!this.userService.user) {
      this.router.navigate(['login']);
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userService.user = new User();
    this.router.navigate(['login']);
  }
}
