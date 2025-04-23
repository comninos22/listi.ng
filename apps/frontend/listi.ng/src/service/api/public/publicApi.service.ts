// filepath: c:\Users\comni\Documents\GitHub\listi.ng\apps\listi.ng\src\app\api.service.ts
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const API_URL_TOKEN = new InjectionToken('API_URL_TOKEN');
@Injectable({ providedIn: 'root' })
export class PublicApiService {
  //protected apiUrl = 'http://localhost:3000/api';
  constructor(
    protected http: HttpClient,
    @Inject(API_URL_TOKEN) protected apiUrl: string
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
  get<T>(path: string, params?: any) {
    return this.http.get<T>(`${this.getFullUrl(path)}`, { params });
  }
  post<T>(path: string, body: any) {
    return this.http.post<T>(`${this.getFullUrl(path)}`, body);
  }
  put<T>(path: string, body: any) {
    return this.http.put<T>(`${this.getFullUrl(path)}`, body);
  }
  delete<T>(path: string) {
    return this.http.delete<T>(`${this.getFullUrl(path)}`);
  }
  patch<T>(path: string, body: any) {
    return this.http.patch<T>(`${this.getFullUrl(path)}`, body);
  }
}
