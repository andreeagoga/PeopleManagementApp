import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-updatetodo',
  templateUrl: './updatetodo.component.html',
  styleUrls: ['./updatetodo.component.scss']
})
export class UpdatetodoComponent implements OnInit {
  newItem: Todo = {};
  private currentActivityId?: number;
  private routeSub: Subscription = new Subscription();
  errors: any;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, private service: TodoService,  private _snackBar: MatSnackBar, private router : ActivatedRoute, private routerNew : Router) { }

  ngOnInit(): void {
    this.routeSub = this.router.params.subscribe((params) => {
      this.currentActivityId = params['id'];
      if (this.currentActivityId) {
        this.service
          .getCompanyById(this.currentActivityId)
          .subscribe((todo: Todo) => {
            this.updateTodoForm.patchValue(todo);
          });
      }
    });

  }
  
  updateTodoForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    endDate: ['', [Validators.required]],
    idComplete:[''],
  });
  
  get name() { return this.updateTodoForm.get('name'); }
  get endDate() { return this.updateTodoForm.get('endDate'); }
  get isComplete() { return this.updateTodoForm.get('isComplete'); }


  onSubmitTodoUpdate() {
    let activity = this.updateTodoForm.value;
    activity.id = this.currentActivityId;
    if(this.currentActivityId){
      this.service.updateItem(this.currentActivityId, activity).subscribe((todo) => {
        this._snackBar.open('Itemul a fost modificat', "ok", {
          verticalPosition: 'top',
          duration: 2 * 1000 
        });
        this.updateTodoForm.reset();
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
    this.routerNew.navigate(['todo']);
  }

}
