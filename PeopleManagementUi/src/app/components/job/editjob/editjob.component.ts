import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-editjob',
  templateUrl: './editjob.component.html',
  styleUrls: ['./editjob.component.scss']
})
export class EditjobComponent implements OnInit {
  private currentActivityId?: number;
  private routeSub: Subscription = new Subscription();
  items: Job[] = []
  errors: any;


  constructor(private http:HttpClient, private formBuilder: FormBuilder, private jobService: JobService,  private _snackBar: MatSnackBar, private router : ActivatedRoute, private routerNew : Router) { }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      console.log(params);
      this.currentActivityId = params['id'];
      if (this.currentActivityId) {
        this.jobService
          .getJobById(this.currentActivityId, this.currentActivityId)
          .subscribe((job: Job) => {
            this.updateForm.patchValue(job);
            // this.items = job.people? job.people : [];
          });
      }
    });
  }

  updateForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    location:['', [Validators.required]],
    type:['', [Validators.required]],
  });
  
  get title() { return this.updateForm.get('title'); }
  get description() { return this.updateForm.get('description'); }
  get location() { return this.updateForm.get('location'); }
  get type() { return this.updateForm.get('type'); }

  onSubmitUpdate() {
    console.log(this.router.params);

    this.router.params.subscribe((params) => {
      const id = params['id'] as number;
      console.log(params);
      this.errors = undefined;
      let activity = this.updateForm.value;
      activity.id = this.currentActivityId;
      if(this.currentActivityId){
        this.jobService.updateItem(this.currentActivityId, activity, id).subscribe((job) => {
          this._snackBar.open('Itemul a fost modificat', "ok", {
            verticalPosition: 'top',
            duration: 2 * 1000 
          });
          this.updateForm.reset();
          this.navigateToMainPage();
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
  navigateToMainPage(){
    this.routerNew.navigate(['company/job/:id']);
  }
}
