import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { LoginRequest } from '../../../../core/auth/models/login-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  //propiedades
  loginError = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  ]);

  password = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const credentials: LoginRequest = {
      email: this.email.value ?? '',
      password: this.password.value ?? '',
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);

        console.log('Login successful:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.loginError =
          'Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.';

        setTimeout(() => {
          this.loginError = '';
          this.email.setValue('');
          this.password.setValue('');
        }, 3000);
      },
    });
  }
}
