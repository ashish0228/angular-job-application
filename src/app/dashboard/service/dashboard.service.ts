import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  API_ENDPOINT = environment.API_ENDPOINT;
  constructor(private http: HttpClient) { }

  getAllData(pagination: any) {
    return this.http.post(`${this.API_ENDPOINT}/jobapplication/getAll`, pagination);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.API_ENDPOINT}/jobapplication/delete/${id}`);
  }

  getDataById(id: string) {
    return this.http.get(`${this.API_ENDPOINT}/jobapplication/get/${id}`);
  }

  getSearch(data: any) {
    return this.http.post(`${this.API_ENDPOINT}/jobapplication/search`, data);
  }
}
