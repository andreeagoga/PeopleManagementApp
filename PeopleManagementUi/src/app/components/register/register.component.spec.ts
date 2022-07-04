import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
//   this.authService.register(this.username?.value, this.password?.value, this.email?.value, this.firstName?.value, this.lastName?.value).subscribe((tokenObj) => {
  //     localStorage.setItem('token', tokenObj.token);
  //     this._snackBar.open('Register successful', 'OK', {
  //       verticalPosition: 'top',
  //       duration: 6 * 1000,
  //     });
  //     this.navigateToConfirmPage();
  //     this.registerForm.reset();
  //   }, (error) => {

  //     console.log(error);
  //     this._snackBar.open("Register failed: " + error.error, "Ok", {
  //       verticalPosition: 'top',
  //       duration: 6 * 1000,
  //   });
  // });