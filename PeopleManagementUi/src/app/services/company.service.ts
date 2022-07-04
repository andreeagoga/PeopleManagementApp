import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { API_URL } from '../constants';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient) { }

  getItem(){
    return this.httpClient.get<Company[]>(`${API_URL}/company`); 
  }

  getCompanyById(id: number){
    return this.httpClient.get<Company>(`${API_URL}/company/${id}`);
  }

  addItem(item: Company){
    return this.httpClient.post<Company>(`${API_URL}/company/`, item); 
  }

  updateItem(itemId: number, item: Company){
    return this.httpClient.put<Company>(`${API_URL}/company/${itemId}`, item);
  }

  deleteItem(item: Company){
    return this.httpClient.delete(`${API_URL}/company/${item.id}`);
  }

  filterByLocation(item: Company){
    return this.httpClient.get<Company[]>(`${API_URL}/company/?searchLocation=${item.location}`); 
  }

  // filterByJobTitle(item: Company){
  //   return this.httpClient.get<Company[]>(`${API_URL}/company/?searchJobTitle=${item.GetJobs().title}`);}`); 
  // }

}
