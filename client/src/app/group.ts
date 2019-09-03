export class Group {
  constructor(public name?: string,
              public subGroup: Group[] = [],
              public admin: string[] = [],
              public assis: string[] = [],
              public users: string[] = []) {

  }

  toString() {
    return `Group: { name = '${this.name}', subGroup = ${this.subGroup}, `
      + `admin = ${this.admin}, assis = ${this.assis}, users = ${this.users}`;
  }

  copyTo(group: Group) {
    group.name = this.name;
    group.subGroup = this.subGroup;
    group.admin = this.admin;
    group.assis = this.assis;
    group.users = this.users;
  }
}
