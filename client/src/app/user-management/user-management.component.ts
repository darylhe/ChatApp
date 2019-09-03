import { AfterViewInit, Component, Injectable, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
@Injectable()
export class UserManagementComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['username', 'superAdmin', 'email', 'operations'];

  users: User[] = [];

  constructor(private userService: UserService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.userService.allUser()
      .subscribe((users) => {
        this.users = users.map(user => {
          user.enabled = true;
          return Object.assign(new User(), user);
        });
      });
  }

  ngOnInit() {
  }

  userDialog(user: User = new User()) {
    console.log(user.copyTo);
    const dialogRef = this.dialog.open(UserProfileComponent, {
      width: '300px',
      data: Object.create(user),
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newUser: User) => {
      // console.log(newUser.enabled);
      if (!newUser) {
        return;
      }

      if (newUser.enabled) {
        // update
        this.userService.updateUser(newUser)
          .subscribe(resp => {
            if (resp.status === 204) {
              newUser.copyTo(user);
            } else {
              this.snackBar.open(resp.body);
            }
          });
      } else {
        newUser.enabled = true;
        this.userService.addUser(newUser)
          .subscribe(_ => {
            this.users = this.users.concat(newUser);
          }, error => {
            this.snackBar.open(error.error);
          });
      }
    });
  }

  removeUser(element: User) {
    this.userService.deleteUser(element)
      .subscribe(resp => {
        if (resp.status === 204) {
          this.users = this.users.filter(i => i.username !== element.username);
        } else {
          this.snackBar.open(resp.body);
        }
      });
  }

}
