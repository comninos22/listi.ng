// filepath: c:\Users\comni\Documents\GitHub\listi.ng\apps\listi.ng\src\app\api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProtectedApiService {
  private apiUrl = 'https://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/todos`);
  }

  addTodo(todo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/todos`, todo);
  }

}
