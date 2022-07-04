import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  newItem: Company = {};
  private currentActivityId?: number;
  private routeSub: Subscription = new Subscription();
  items: Job[] = []
  errors: any;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, private companyService: CompanyService,  private _snackBar: MatSnackBar, private router : ActivatedRoute, private routerNew : Router) { }

  ngOnInit(): void {
    this.routeSub = this.router.params.subscribe((params) => {
      this.currentActivityId = params['id'];
      if (this.currentActivityId) {
        this.companyService
          .getCompanyById(this.currentActivityId)
          .subscribe((company: Company) => {
            this.updateForm.patchValue(company);
            this.items = company.jobs? company.jobs : [];
          });
      }
    });

  }

  updateForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    location:['', [Validators.required]],
  });
  
  get name() { return this.updateForm.get('name'); }
  get description() { return this.updateForm.get('description'); }
  get location() { return this.updateForm.get('location'); }


  onSubmitUpdate() {
    let activity = this.updateForm.value;
    activity.id = this.currentActivityId;
    if(this.currentActivityId){
      this.companyService.updateItem(this.currentActivityId, activity).subscribe((company) => {
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
      }
      );
    }
  }

  navigateToMainPage(){
    this.routerNew.navigate(['company']);
  }

}

