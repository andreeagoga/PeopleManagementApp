import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }
    getItem(){
      return this.httpClient.get<Todo[]>(`${API_URL}/todo`); 
    }
  
    getCompanyById(id: number){
      return this.httpClient.get<Todo>(`${API_URL}/todo/${id}`);
    }
  
    addItem(item: Todo){
      return this.httpClient.post<Todo>(`${API_URL}/todo/`, item); 
    }
  
    updateItem(itemId: number, item: Todo){
      return this.httpClient.put<Todo>(`${API_URL}/todo/${itemId}`, item);
    }
  
    deleteItem(item: Todo){
      return this.httpClient.delete(`${API_URL}/todo/${item.id}`);
    }
  
    filterByStatus(){
      return this.httpClient.get<Todo[]>(`${API_URL}/company/?searchStatus`); 
    }
  
}
