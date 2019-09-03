import { AfterViewInit, Component } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatDialog, MatSnackBar, MatTreeNestedDataSource } from '@angular/material';
import { Group } from '../group';
import { GroupProfileComponent } from '../group-profile/group-profile.component';
import { GroupService } from '../group.service';
import { GroupNamePromptComponent } from '../group-name-prompt/group-name-prompt.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent implements AfterViewInit {
  allGroups: Group[];

  treeControl = new NestedTreeControl<Group>(node => node.subGroup);
  dataSource = new MatTreeNestedDataSource<Group>();

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private groupService: GroupService,
              private userService: UserService) {
  }

  ngAfterViewInit(): void {
    this.groupService.getGroups()
      .subscribe((groups) => {
        this.allGroups = groups.map(group => Object.assign(new Group(), group));
        this.dataSource.data = this.allGroups;
      });
  }

  hasChild = (_: number, node: Group) => !!node.subGroup && node.subGroup.length > 0;

  openProfile(group: Group) {
    const dialogRef = this.dialog.open(GroupProfileComponent, {
      width: '400px',
      // height: '400px',
      data: Object.assign(new Group(), group),
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newGroup: Group) => {
      if (!newGroup) {
        return;
      }

      newGroup.copyTo(group);
      this.saveGroups();
    });
  }

  private saveGroups() {
    this.groupService.saveGroups(this.allGroups)
      .subscribe(() => {
        this.snackBar.open('Successfully saved.');
      }, (error) => {
        this.snackBar.open(error.error);
      });
  }

  removeGroup(group: Group) {
    const parent = this.findParent(group, this.allGroups[0]);
    if (parent === null) {
      return;
    }

    parent.subGroup = parent.subGroup.filter(sub => sub.name !== group.name);
    this.saveGroups();
    this.refreshTree();
  }

  findParent(group: Group, fromGroup: Group): Group {
    if (group.name === fromGroup.name) {
      return null;
    }

    for (const subGroup of fromGroup.subGroup) {
      if (subGroup.name === group.name) {
        return fromGroup;
      } else {
        const result = this.findParent(group, subGroup);
        if (result !== null) {
          return result;
        }
      }
    }
    return null;
  }

  addGroup(parentGroup: Group) {
    const dialogRef = this.dialog.open(GroupNamePromptComponent, {
      width: '300px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newName: string) => {
      if (!newName) {
        return;
      }
      parentGroup.subGroup = parentGroup.subGroup.concat(new Group(newName));
      this.saveGroups();
      this.refreshTree();
    });
  }

  refreshTree() {
    const data = this.dataSource.data;
    this.dataSource.data = null;
    this.dataSource.data = data;
  }
}
