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
  
    addItem(item: Job, companyId: number){
      return this.httpClient.post<Job>(`${API_URL}/company/${companyId}/job/`, item); 
    }
  
    updateItem(companyId: number, jobId: number, item: Job){
      return this.httpClient.put<Job>(`${API_URL}/company/${companyId}/job/${jobId}`, item);
    }
  
    deleteItem(item: Job, companyId: number){
      return this.httpClient.delete(`${API_URL}/company/${companyId}/job/${item.id}`);
    }
  
    filterByTitle(item: Job, companyId: number){
      return this.httpClient.get<Job[]>(`${API_URL}/company/${companyId}/job/?searchTitle=${item.title}`); 
    }

    filterByType(item: Job, companyId: number){
      return this.httpClient.get<Job[]>(`${API_URL}/company/${companyId}/job/?searchType=${item.type}`); 
    }

    filterByLocation(item: Job, companyId: number){
      return this.httpClient.get<Job[]>(`${API_URL}/company/${companyId}/job/?searchLocation=${item.location}`); 
    }
   
}
