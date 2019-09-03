export class User {
  constructor(
    public username?: string,
    public email?: string,
    public superAdmin: boolean = false,
    public enabled: boolean = false
  ) { }

  toString(): string {
    return 'User(' + this.username + ')';
  }

  copyTo(user: User) {
    user.username = this.username;
    user.email = this.email;
    user.superAdmin = this.superAdmin;
    user.enabled = this.enabled;
  }
}
