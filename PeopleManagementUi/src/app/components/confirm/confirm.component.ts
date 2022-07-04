import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, public authService: AuthenticationService, private route: Router){}
   
  confirmForm = this.formBuilder.group({
    username: ['', [Validators.required]],
  });

  get username(){
    return this.confirmForm.get('username');
  }

  ngOnInit(): void {
  }

  onConfirm() {
    this.authService.confirmAccount(this.confirmForm.value).subscribe(
      (user) => {
        this._snackBar.open('Account confirmed successfully', '', {
          verticalPosition: 'top',
          duration: 2* 1000,
        });
        this.confirmForm.reset();
        this.navigateToLoginPage();
      }, (error) => {
        this._snackBar.open('Error while confirming account', '', {
          verticalPosition: 'top',
          duration: 2 *1000,
        });
      }
    );
  }

  navigateToLoginPage(){
    this.route.navigate(['auth/login']);
  }

}
