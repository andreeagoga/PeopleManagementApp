import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-addpeople',
  templateUrl: './addpeople.component.html',
  styleUrls: ['./addpeople.component.scss']
})
export class AddpeopleComponent implements OnInit {

  errors: any = undefined;

  constructor(private formBuilder: FormBuilder, private peopleService: PeopleService, private _snackBar: MatSnackBar, private router : Router, private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
  }

  addPeopleForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    phone:['', [Validators.required]],
    location:['', [Validators.required]],
    email:['', [Validators.required]],
    yearsOfExperience:['', [Validators.required]],

  });

  get firstName() { return this.addPeopleForm.get('firstName'); }
  get lastName() { return this.addPeopleForm.get('lastName'); }
  get phone() { return this.addPeopleForm.get('phone'); }
  get location() { return this.addPeopleForm.get('location'); }
  get email() { return this.addPeopleForm.get('email'); }
  get yearsOfExperience() { return this.addPeopleForm.get('yearsOfExperience'); }


  onAddSubmit() {
  this.route.params.subscribe((params) => {
    const id = params['id'] as number;
    this.errors = undefined;
    this.peopleService.addItem(this.addPeopleForm.value, id,id).subscribe((people) => {
      this._snackBar.open('Itemul a fost adaugat', "ok", {
        verticalPosition: 'top',
        duration: 6 * 1000 
      });
      this.navigateToPeoplePage();
      this.addPeopleForm.reset();
    }, (error) => {
      this.errors = error.error.errors;
      this._snackBar.open("Itemul nu a putut fi adaugat: " + error.error, "ok", {
        verticalPosition: 'top',
        duration: 6 * 1000
        });
  }); 

  });
}

  navigateToPeoplePage(){
    this.router.navigate(['company/', this.route.snapshot.params['companyId'], 'job', this.route.snapshot.params['id'], 'people']);
  }
}



