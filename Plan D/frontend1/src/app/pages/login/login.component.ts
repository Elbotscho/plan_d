import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private auth: AuthService, private snackBar: MatSnackBar, private layout: LayoutComponent) {}

  isLoginView: boolean = true;

  userRegisterObj: any = {
    username:'',
    email:'',
    password: '',
    password2: '',
  }

  userLoginObj: any = {
    username:'',
    password:'',
  }

  router = inject(Router)

  onRegister() {
    const username = this.userRegisterObj.username;
    const email = this.userRegisterObj.email;
    const password = this.userRegisterObj.password;
    const password2 = this.userRegisterObj.password2;
    this.auth.register(username, email, password, password2).subscribe(
      response => {
        console.log(response);
        this.isLoginView = true;
      },
      error => {
        console.log(error)
        this.snackBar.open('Registration failed.' + error.message, 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          });
      }
    );
  }

  onLogin() {
    const username = this.userLoginObj.username;
    const password = this.userLoginObj.password;
    this.auth.login(username, password).subscribe(
      response => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.layout.isLoginView = true;
        }
        this.router.navigateByUrl('galactic-epmire');
      },
      error => {
        this.snackBar.open('Login failed. Please check your username and password.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          });
      }
    );

  }


}
