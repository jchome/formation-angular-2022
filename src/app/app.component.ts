import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'maboutique-app';

  public user: any;

  constructor(private authService: AuthService, private router: Router){
    this.user = this.authService.user;
  }

  public logout():void{
    this.authService.logout();
    localStorage.removeItem('user');
    this.router.navigate(["home"]);
  }

  public userIsConnected(): boolean{
    return localStorage.getItem('user') !== null;
  }

  public userIsAdmin(){
    let userData = localStorage.getItem('user');
    if(userData === null){
      return false;
    }else{
      let user: any = JSON.parse(userData);
      if(user && user.roles){
        return user.roles.indexOf("super-admin") > -1
      }else{
        return false;
      }
    }
  }

}
