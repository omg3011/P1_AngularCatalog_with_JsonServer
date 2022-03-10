import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  postTask(data: any) {
    return this.http.post<any>(this.baseUrl+'/tasks', data);
  }

  getTasks() {
    return this.http.get<any>(this.baseUrl+'/tasks');
  }

  putTask(id: number, data: any) {
    return this.http.put<any>(this.baseUrl+'/tasks/'+id, data);
  }

  deleteTask(id: number) {
    return this.http.delete<any>(this.baseUrl+'/tasks/'+id);
  }
}
