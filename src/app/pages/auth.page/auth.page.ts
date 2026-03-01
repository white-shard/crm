import { AuthService } from '@/models/auth/auth.service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth.page',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.page.html',
  styleUrl: 'auth.page.css',
})
export class AuthPage {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.formBuilder.group({
    username: [null, [Validators.required, Validators.maxLength(64)]],
    password: [null, [Validators.required, Validators.maxLength(32)]],
  });

  errorMessage = signal<string | undefined>(undefined);

  onSubmit() {
    this.errorMessage.set(undefined);

    if (this.form.valid) {
      // @ts-ignore
      this.authService.login(this.form.value).subscribe({
        error: (err) => {
          this.errorMessage.set(err.error.message);
        },
        complete: () => {
          this.router.navigate(['/dashboard']);
        },
      });
    } else console.log('Form invalid');
  }
}
