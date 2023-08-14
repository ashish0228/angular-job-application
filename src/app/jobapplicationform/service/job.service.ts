import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  API_ENDPOINT = environment.API_ENDPOINT;
  constructor(private http: HttpClient) { }

  saveJob(data: any) {
    return this.http.post(`${this.API_ENDPOINT}/jobapplication/create`, data);
  }

  updateJob(data: any, id: string) {
    return this.http.patch(`${this.API_ENDPOINT}/jobapplication/update/${id}`, data);
  }
}
