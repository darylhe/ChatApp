export class Channel {
  constructor(public name: string,
              public groupName: string,
              public users: string[] = []) {

  }

  copyTo(channel: Channel) {
    channel.name = this.name;
    channel.groupName = this.groupName;
    channel.users = this.users;
  }
}
