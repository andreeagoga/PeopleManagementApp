import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  errors: any = undefined;

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService, private _snackBar: MatSnackBar, private router : Router) { 
    
  }

  ngOnInit(): void {
  }

  addForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    location:['', [Validators.required]],
  });

  get name() { return this.addForm.get('name'); }
  get description() { return this.addForm.get('description'); }
  get location() { return this.addForm.get('location'); }


  onAddSubmit() {
    this.errors = undefined;
    this.companyService.addItem(this.addForm.value).subscribe((company) => {
      this._snackBar.open('Itemul a fost adaugat', "ok", {
        verticalPosition: 'top',
        duration: 2 * 1000 
      });
      this.navigateToMainPage();
      this.addForm.reset();
    }, (error) => {
      this.errors = error.error.errors;
      this._snackBar.open("Itemul nu a putut fi adaugat: " + error.error, "ok", {
        verticalPosition: 'top',
        duration: 2 * 1000
        });
  }); 
}

  navigateToMainPage(){
    this.router.navigate(['company']);
  }
}
