import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = 'http://localhost:3000/patient';
  addUserApiUrl: string = 'http://localhost:3000/users';
  createCasepaperUrl: string = 'http://localhost:3000/casePaper';

  selectedPatient = new Subject();


  constructor(private http: HttpClient) {
   }

  createPatient(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getPatients(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createUser(payload: any): Observable<any> {
    return this.http.post(this.addUserApiUrl, payload);
  }

  updateUser(payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${payload.id}`, payload);
  }

  getUsersList(): Observable<any> {
    return this.http.get(this.addUserApiUrl);
  }

  createCasePaper(payload: any): Observable<any> {
    return this.http.post(this.createCasepaperUrl, payload);
  }

  getCasepaperDetails(): Observable<any> {
    return this.http.get(this.createCasepaperUrl);
  }
}
