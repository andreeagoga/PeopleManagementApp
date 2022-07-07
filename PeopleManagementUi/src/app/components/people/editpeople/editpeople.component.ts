import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/models/job';
import { People } from 'src/app/models/people';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-editpeople',
  templateUrl: './editpeople.component.html',
  styleUrls: ['./editpeople.component.scss']
})
export class EditpeopleComponent implements OnInit {

  private companyId?: number;
  private jobId?: number;
  private peopleId?: number;
  private routeSub: Subscription = new Subscription();
  items: People[] = []
  errors: any;


  constructor(private http:HttpClient, private formBuilder: FormBuilder, private peopleService: PeopleService,  private _snackBar: MatSnackBar, private router : ActivatedRoute, private routerNew : Router) { }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.companyId = params['companyId'];
      this.jobId = params['id'];
      this.peopleId = params['peopleId'];
      if (this.companyId && this.jobId && this.peopleId) {
        this.peopleService
          .getPeopleById(this.companyId, this.jobId, this.peopleId)
          .subscribe((people: People) => {
            this.updateForm.patchValue(people);
            // this.items = job.people? job.people : [];
          });
      }
    });
  }

  updateForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    phone:['', [Validators.required]],
    location:['', [Validators.required]],
    email:['', [Validators.required]],
    yearsOfExperience:['', [Validators.required]],

  });

  get firstName() { return this.updateForm.get('firstName'); }
  get lastName() { return this.updateForm.get('lastName'); }
  get phone() { return this.updateForm.get('phone'); }
  get location() { return this.updateForm.get('location'); }
  get email() { return this.updateForm.get('email'); }
  get yearsOfExperience() { return this.updateForm.get('yearsOfExperience'); }

  onSubmitUpdate() {
    // console.log(this.router.params);
    this.router.params.subscribe((params) => {
      const companyId = params['companyId'] as number;
      const jobId = params['jobId'] as number;
      console.log(params);
      this.errors = undefined;
      let activity = this.updateForm.value;
      activity.id = Number(this.peopleId);
      console.log(typeof this.peopleId);
      // console.log(activity.id)
      if(this.peopleId){
        this.peopleService.updateItem(activity, companyId, jobId, this.peopleId).subscribe((people) => {
          this._snackBar.open('Itemul a fost modificat', "ok", {
            verticalPosition: 'top',
            duration: 2 * 1000 
          });
          // this.updateForm.reset();
          this.navigateToPeoplePage();
        }, (error) => {
          this.errors = error.error.errors;
          this._snackBar.open("Itemul nu a putut fi modificat: " + error.error, "ok", {
            verticalPosition: 'top',
            duration: 2 * 1000
            });
        });
      }
    
    }); 
  }
  navigateToPeoplePage(){
    this.routerNew.navigate(['company', this.companyId, 'job', this.jobId, 'people']);
  }
}
