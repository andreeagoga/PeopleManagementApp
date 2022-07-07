import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private httpClient: HttpClient) {}
  getItem(companyId: number, jobId: number, peopleId: number){
    return this.httpClient.get<Skill[]>(`${API_URL}/company/${companyId}/job/${jobId}/people/${peopleId}/skill`); 
  }

  getPeopleById(companyId: number, jobId: number, peopleId: number, skillId: number){
    return this.httpClient.get<Skill>(`${API_URL}/company/${companyId}/job/${jobId}/people/${peopleId}/skill/${skillId}`);
  }

  addItem(item: Skill, companyId: number, jobId: number, peopleId: number){
    return this.httpClient.post<Skill>(`${API_URL}/company/${companyId}/job/${jobId}/people/${peopleId}/skill`, item); 
  }

  updateItem(peopleId: number, item: Skill, companyId: number, jobId: number){
    return this.httpClient.put<Skill>(`${API_URL}/company/${companyId}/job/${jobId}/people/${peopleId}/skill/${item.id}`, item);
  }

  deleteItem(item: Skill, companyId: number, jobId: number, peopleId: number){
    return this.httpClient.delete(`${API_URL}/company/${companyId}/job/${jobId}/people/${peopleId}/skill/${item.id}`);
  }
}
