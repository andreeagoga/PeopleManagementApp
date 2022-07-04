import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router : Router, private authService: AuthenticationService) {} 

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onLoginSubmit() {
    this.authService.login(this.username?.value, this.password?.value).subscribe((tokenObj) => {
      localStorage.setItem('token', tokenObj.token);
      this._snackBar.open('Login successful', 'OK', {
        verticalPosition: 'top',
        duration: 2 * 1000,
      });
      this.loginForm.reset();
      this.navigateToMainPage();
    }, (error) => {

      console.log(error);
      this._snackBar.open("Login failed: " + error.error, "Ok", {
        verticalPosition: 'top',
        duration: 2 * 1000,
    });
  });
  }

  navigateToMainPage(){
    this.router.navigate(['company']);
  }



  ngOnInit(): void {

  }

}
