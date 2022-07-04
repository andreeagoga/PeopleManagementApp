import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';
import { Company } from '../models/company';
import { Job } from '../models/job';
import { People } from '../models/people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpClient: HttpClient) {}
  getItem(){
    return this.httpClient.get<People[]>(`${API_URL}/company/job/people/${localStorage.getItem('companyId')}/${localStorage.getItem('id')}`); 
  }
  

  getPeopleById(id: number, company: Company, job: Job){
    return this.httpClient.get<People>(`${API_URL}/company/job/people/${company.id}/${job.id}/${id}`);
  }

  addItem(item: People, id: number){
    return this.httpClient.post<People>(`${API_URL}/company/job/people/${id}`, item); 
  }

  updateItem(item: People, company: Company, job: Job){
    return this.httpClient.put<People>(`${API_URL}/company/job/people/${company.id}/${job.id}/${item.id}`, item);
  }

  deleteItem(item: People, company: Company, job: Job){
    return this.httpClient.delete(`${API_URL}/company/job/people/${company.id}/${job.id}/${item.id}`);
  }

  // filterByTitle(item: People, companyId: number){
  //   return this.httpClient.get<People[]>(`${API_URL}/company/people/${companyId}/?searchPeopleTitle=${item.title}`); 
  // }

  // filterByType(item: People, companyId: number){
  //   return this.httpClient.get<People[]>(`${API_URL}/company/people/${companyId}/?searchPeopleType=${item.type}`); 
  // }

  // filterByLocation(item: People,companyId: number){
  //   return this.httpClient.get<People[]>(`${API_URL}/company/People/${companyId}/?searchPeopleLocation=${item.location}`); 
  // }
 
}
