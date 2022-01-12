import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  doLogin(form: any) {
    let username: string = "";
    let password: string = "";
    if(form.valid){
      username = form.value.username;
      password = form.value.password;
    }else{
      this.error = "Errorin the form.";
      return;
    }

    let userIsConnected: boolean = this.authService.login(username, password);
    if (userIsConnected) {
      localStorage.setItem('user', JSON.stringify(this.authService.user));
      let successMessage: string = "Welcome " + this.authService.user.username;
      if (this.authService.user.roles.indexOf("super-admin") > -1) {
        this.router.navigate(["admin-products"], { state: { message: successMessage } });
      } else {
        this.router.navigate(["home"], { state: { message: successMessage } });
      }
    } else {
      this.error = "Error: username or password is incorrect.";
    }
  }
}
