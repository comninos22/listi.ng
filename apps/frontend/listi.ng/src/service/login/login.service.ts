import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicApiService } from '../api/public/publicApi.service';

@Injectable({
  providedIn: 'root', 
})
export class LoginService {
  constructor(private api: PublicApiService) {}

  /**
   * Logs in the user by sending credentials to the server.
   * @param credentials An object containing `email` and `password`.
   * @returns An Observable with the server response.
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.api.post('/auth/login', credentials);
  }

  /**
   * Signs up a new user by sending their details to the server.
   * @param credentials An object containing `email`, `password`, and `name`.
   * @returns An Observable with the server response.
   */
  signup(credentials: {
    email: string;
    password: string;
    name: string;
  }): Observable<any> {
    return this.api.post('/auth/signup', credentials);
  }

  /**
   * Logs out the user by invalidating the token on the server (if applicable).
   * @returns An Observable with the server response.
   */
  logout(): Observable<any> {
    return this.api.post('/auth/logout', {});
  }

  /**
   * Stores the JWT token in localStorage.
   * @param token The JWT token to store.
   */
  storeToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  /**
   * Retrieves the JWT token from localStorage.
   * @returns The JWT token or null if not found.
   */
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  /**
   * Clears the JWT token from localStorage.
   */
  clearToken(): void {
    localStorage.removeItem('jwt_token');
  }
}
