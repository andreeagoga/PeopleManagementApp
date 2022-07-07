import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.scss']
})
export class AddskillComponent implements OnInit {

  errors: any = undefined;

  constructor(private formBuilder: FormBuilder, private skillService: SkillService, private _snackBar: MatSnackBar, private router : Router, private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
  }

  addSkillForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    level: ['', [Validators.required]],
    type:['', [Validators.required]],


  });

  get name() { return this.addSkillForm.get('name'); }
  get level() { return this.addSkillForm.get('level'); }
  get type() { return this.addSkillForm.get('type'); }
  


  onAddSubmit() {
  this.route.params.subscribe((params) => {
    const companyId = params['companyId'] as number;
    const jobId = params['jobId'] as number;
    const peopleId = params['peopleId'] as number;
    this.errors = undefined;
    this.skillService.addItem(this.addSkillForm.value, companyId, jobId, peopleId).subscribe((skill) => {
      this._snackBar.open('Itemul a fost adaugat', "ok", {
        verticalPosition: 'top',
        duration: 6 * 1000 
      });
      this.navigateToSkillPage();
      this.addSkillForm.reset();
    }, (error) => {
      this.errors = error.error.errors;
      this._snackBar.open("Itemul nu a putut fi adaugat: " + error.error, "ok", {
        verticalPosition: 'top',
        duration: 6 * 1000
        });
  }); 

  });
}

  navigateToSkillPage(){
    this.router.navigate(['company/', this.route.snapshot.params['companyId'], 'job', this.route.snapshot.params['jobId'], 'people']);
  }
}



