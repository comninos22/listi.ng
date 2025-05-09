import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../service/api/auth/auth.service';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  changePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onChangePassword(): void {
    if (this.changePasswordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.changePasswordForm.value;

      if (newPassword !== confirmPassword) {
        this.snackBar.open('New password and confirm password do not match.', 'Close', {
          duration: 3000,
        });
        return;
      }

      // Call the API to change the password (mocked here)
      this.snackBar.open('Password changed successfully!', 'Close', {
        duration: 3000,
      });

      // Reset the form
      this.changePasswordForm.reset();
    }
  }

  onLogout(): void {
    this.loginService.clearToken(); // Clear the JWT token
    this.router.navigate(['/login']); // Redirect to the login page
    this.snackBar.open('Logged out successfully.', 'Close', {
      duration: 3000,
    });
  }
}