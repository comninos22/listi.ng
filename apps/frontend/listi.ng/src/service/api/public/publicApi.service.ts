// filepath: c:\Users\comni\Documents\GitHub\listi.ng\apps\listi.ng\src\app\api.service.ts
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const API_URL_TOKEN = new InjectionToken('API_URL_TOKEN');
@Injectable({ providedIn: 'root' })
export class PublicApiService {
  protected apiUrl = "http://localhost:3000/api"
  constructor(
    protected http: HttpClient,
  ) {}
  getFullUrl(path: string): string {
    if (!path.startsWith('/')) {
      path = '/' + path; 
    }
    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return `${this.apiUrl}${path}`;
  }
  interceptRequestHeaders(headers: any): any {
    return headers;
  }
  get(path: string, params?: any): Observable<any> {
    return this.http.get(`${this.getFullUrl(path)}`, { params });
  }
  post(path: string, body: any): Observable<any> {
    return this.http.post(`${this.getFullUrl(path)}`, body);
  }
  put(path: string, body: any): Observable<any> {
    return this.http.put(`${this.getFullUrl(path)}`, body);
  }
  delete(path: string): Observable<any> {
    return this.http.delete(`${this.getFullUrl(path)}`);
  }
  patch(path: string, body: any): Observable<any> {
    return this.http.patch(`${this.getFullUrl(path)}`, body);
  }
}
