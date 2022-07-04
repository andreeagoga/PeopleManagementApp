import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router : Router, private authService: AuthenticationService) {} 

  registerForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],

  });

  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get email() { return this.registerForm.get('email'); }
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastname'); }
  
  onRegisterSubmit() {
    this.authService.register(this.username?.value, this.password?.value, this.email?.value, this.firstName?.value, this.lastName?.value).subscribe((tokenObj) => {
      this._snackBar.open('Registration successful', 'OK', {
        verticalPosition: 'top',
        duration: 2 * 1000,
      });
      this.registerForm.reset();
      this.navigateToConfirmPage();
    }, (error) => {

      console.log(error);
      this._snackBar.open("Registration failed: " + error.error, "Ok", {
        verticalPosition: 'top',
        duration: 2 * 1000,
    });
  }
  );
  }

  navigateToConfirmPage(){
    this.router.navigate(['auth/username']);
  }
  
  ngOnInit(): void {
  }

}
