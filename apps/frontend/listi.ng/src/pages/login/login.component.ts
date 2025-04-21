import { Component } from '@angular/core';
import {
  FormBuilder,
  type FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import  { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
   MatSnackBar,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.loginService.login(credentials).subscribe({
        next: (response) => {
          // Store the JWT token
          if (response && response.token) {
            this.loginService.storeToken(response.token);
            this.router.navigate(['/']);
          } else {
            this.snackBar.open(
              'Login successful but no token received',
              'Close',
              {
                duration: 3000,
              }
            );
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          this.snackBar.open(
            error.message || 'Login failed. Please try again.',
            'Close',
            {
              duration: 3000,
            }
          );
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  fillDefaultUser(): void {
    this.loginForm.setValue({
      email: 'demo@listi.ng',
      password: 'demo123',
    });
  }
}
