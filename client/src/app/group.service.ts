import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from './group';
import { BASE_URL } from './constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.httpClient
      .get<Group[]>(BASE_URL + '/group');
  }

  saveGroups(groups: Group[]): Observable<Group[]> {
    return this.httpClient
      .put<Group[]>(BASE_URL + '/group', groups);
  }

  getGroup(groupName: string): Observable<Group> {
    return this.getGroups()
      .lift(groups => {
        return this.findGroup(groupName, groups[0]);
      });
  }

  private findGroup(name: string, group: Group): Group {
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
