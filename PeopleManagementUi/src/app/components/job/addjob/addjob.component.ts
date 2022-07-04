import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.scss']
})
export class AddjobComponent implements OnInit {

  errors: any = undefined;

  constructor(private formBuilder: FormBuilder, private jobService: JobService, private _snackBar: MatSnackBar, private router : Router, private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
  }

  addJobForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    location:['', [Validators.required]],
    type:['', [Validators.required]],

  });

  get title() { return this.addJobForm.get('title'); }
  get description() { return this.addJobForm.get('description'); }
  get location() { return this.addJobForm.get('location'); }
  get type() { return this.addJobForm.get('type'); }


  onAddSubmit() {
    console.log(this.route.params);
  this.route.params.subscribe((params) => {
    const id = params['id'] as number;
    console.log(params);
    this.errors = undefined;
    this.jobService.addItem(this.addJobForm.value, id).subscribe((job) => {
      this._snackBar.open('Itemul a fost adaugat', "ok", {
        verticalPosition: 'top',
        duration: 6 * 1000 
      });
      this.navigateToJobPage();
      this.addJobForm.reset();
    }, (error) => {
      this.errors = error.error.errors;
      this._snackBar.open("Itemul nu a putut fi adaugat: " + error.error, "ok", {
        verticalPosition: 'top',
        duration: 6 * 1000
        });
  }); 

  });
}

  navigateToJobPage(){
    this.router.navigate(['company/jobs/' + this.route.snapshot.params['id']]);
  }
}
