import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  newItem: Todo = {};
  dataSource: Todo[] = []; 

  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.service.getItem().subscribe((items) => {
      this.dataSource = items;

    });
  }
  addItem(){
    this.service.addItem(this.newItem).subscribe((item) => {
      this.dataSource = [...this.dataSource, item];
      this.newItem = {};
    });
  }

  updateItem(id: number, item: Todo){
    this.service.updateItem(id, item).subscribe(() => {
      item.isEditing = false;
      this.dataSource = this.dataSource.map((newitem) => (newitem.id === item.id ? item : newitem))
    });
  }

  deleteItem(item: Todo){
    this.service.deleteItem(item).subscribe(() => {
      this.dataSource = this.dataSource.filter((newitem) => newitem.id !== item.id)
    });
  }

  filterByStatus(){
    this.service.filterByStatus().subscribe(() => {
      this.dataSource = this.dataSource.filter((item) => item.isComplete == false)

    });
  }

  navigateToAddTodoPage() {
    this.router.navigate(['todo/add']);
  }
}
