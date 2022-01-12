import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: any[] = [
    {
      username: "admin",
      password: "admin",
      roles: ["super-admin", "user"]
    },
    {
      username: "user",
      password: "user",
      roles: ["user"]
    }
  ];

  public user: any;

  constructor() { }

  public login(username: string, password: string): boolean {
    for (let user of this.users) {
      if (user.username === username && user.password === password) {
        this.user = user;
        return true;
      }
    }
    return false;
  }

  public logout(): void {
    this.user = undefined;
  }

}
