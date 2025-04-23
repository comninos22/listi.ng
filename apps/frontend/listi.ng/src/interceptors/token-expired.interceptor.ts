import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const AuthErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Discard the token 
        localStorage.removeItem('authToken');

        // Show a notification
        snackBar.open('Session expired. Please log in again.', 'Close', {
          duration: 3000,
        });

        // Redirect to the login page
        router.navigate(['/login']);
      }

      // Re-throw the error so it can be handled elsewhere if needed
      return throwError(() => error);
    })
  );
};