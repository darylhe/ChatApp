import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from './group';
import { BASE_URL } from './constants';
import { Channel } from './channel';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private httpClient: HttpClient) { }

  getChannels(): Observable<Channel[]> {
    return this.httpClient
      .get<Channel[]>(BASE_URL + '/channel');
  }

  saveChannels(channels: Channel[]): Observable<Channel[]> {
    return this.httpClient
      .put<Channel[]>(BASE_URL + '/channel', channels);
  }
}
