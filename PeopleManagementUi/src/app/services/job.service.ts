import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';
import { Company } from '../models/company';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private httpClient: HttpClient) {}
    getJobs(companyId: number){
      return this.httpClient.get<Job[]>(`${API_URL}/company/${companyId}/job`);
    }
  
    getJobById(companyId: number, jobId: number){
      return this.httpClient.get<Job>(`${API_URL}/company/${companyId}/job/${jobId}`);
    }
  
    addItem(item: Job, id: number){
      return this.httpClient.post<Job>(`${API_URL}/company/job/${id}`, item); 
    }
  
    updateItem(itemId: number, item: Job, companyId: number){
      return this.httpClient.put<Job>(`${API_URL}/company/job/${companyId}/${itemId}`, item);
    }
  
    deleteItem(item: Job, CompanyId: number){
      return this.httpClient.delete(`${API_URL}/company/job/${CompanyId}/${item.id}`);
    }
  
    filterByTitle(item: Job, companyId: number){
      return this.httpClient.get<Job[]>(`${API_URL}/company/job/${companyId}/?searchJobTitle=${item.title}`); 
    }

    filterByType(item: Job, companyId: number){
      return this.httpClient.get<Job[]>(`${API_URL}/company/job/${companyId}/?searchJobType=${item.type}`); 
    }

    filterByLocation(item: Job, companyId: number){
      return this.httpClient.get<Job[]>(`${API_URL}/company/job/${companyId}/?searchJobLocation=${item.type}`); 
    }
   
}
