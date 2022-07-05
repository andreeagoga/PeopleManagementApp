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
  getItem(companyId: number, jobId: number){
    return this.httpClient.get<People[]>(`${API_URL}/company/${companyId}/job/${jobId}/people`); 
  }
  

  getPeopleById(companyId: number, jobId: number, peopleId: number){
    return this.httpClient.get<People>(`${API_URL}/company/${companyId}/job/${jobId}/people/${peopleId}`);
  }

  addItem(item: People, peopleId: number){
    return this.httpClient.post<People>(`${API_URL}/company/job/people/${peopleId}`, item); 
  }

  updateItem(peopleId: number, item: People, companyId: number, jobId: number){
    return this.httpClient.put<People>(`${API_URL}/company/${companyId}/job/${jobId}/people/${peopleId}`, item);
  }

  deleteItem(item: People, companyId: number, jobId: number){
    return this.httpClient.delete(`${API_URL}/company/${companyId}/job/${jobId}/people/${item.id}`);
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
