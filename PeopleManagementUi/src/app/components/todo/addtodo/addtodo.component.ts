import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.scss']
})
export class AddtodoComponent implements OnInit {
  errors: any = undefined;


  constructor(private formBuilder: FormBuilder, private service: TodoService, private _snackBar: MatSnackBar, private router : Router) { 
    
  }

  ngOnInit(): void {
  }

  addTodoForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    endDate: ['', [Validators.required]],
    isComplete:[false],
  });

  get name() { return this.addTodoForm.get('name'); }
  get endDate() { return this.addTodoForm.get('endDate'); }
  get isComplete() { return this.addTodoForm.get('isComplete'); }


  onAddTodoSubmit() {
    this.errors = undefined;
    this.service.addItem(this.addTodoForm.value).subscribe((todo) => {
      this._snackBar.open('Itemul a fost adaugat', "ok", {
        verticalPosition: 'top',
        duration: 2 * 1000 
      });
      this.navigateToMainPage();
      this.addTodoForm.reset();
    }, (error) => {
      this.errors = error.error.errors;
      this._snackBar.open("Itemul nu a putut fi adaugat: " + error.error, "ok", {
        verticalPosition: 'top',
        duration: 2 * 1000
        });
  }); 
}

  navigateToMainPage(){
    this.router.navigate(['todo']);
  }
}