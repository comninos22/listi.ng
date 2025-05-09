import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtPayload, jwtDecode } from 'jwt-decode'; // Import JwtPayload separately

@Injectable({
  providedIn: 'root',
})
export class JwtGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('jwt_token'); // Retrieve the JWT token from localStorage

    if (token && this.isTokenValid(token)) {
      return true; // Allow access if the token is valid
    }

    // Redirect to login if the token is invalid or missing
    this.router.navigate(['/login']);
    return false;
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = jwtDecode<JwtPayload>(token); // Decode the JWT payload using jwt-decode
      const expiry = payload.exp ? payload.exp * 1000 : 0; // Convert expiry to milliseconds
      return Date.now() < expiry; // Check if the token is still valid
    } catch (e) {
      return false; // Return false if the token is malformed
    }
  }
}
