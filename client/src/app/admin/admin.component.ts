import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
@Injectable()
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(
      (event) => {
        console.log(event);
        if (event instanceof NavigationEnd) {
          if (!this.userService.user.enabled) {
            this.router.navigate(['login']);
          }
        }
      });
  }

}
