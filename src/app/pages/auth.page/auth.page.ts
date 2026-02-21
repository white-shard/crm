import { AuthService } from '@/models/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const FieldValidators = [Validators.required, Validators.maxLength(64)];

@Component({
  selector: 'app-auth.page',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.page.html',
  styleUrl: 'auth.page.css',
})
export class AuthPage {
  authService = inject(AuthService);
  router = inject(Router);

  form = new FormGroup({
    username: new FormControl(null, FieldValidators),
    password: new FormControl(null, FieldValidators),
  });

  onSubmit() {
    if (this.form.valid) {
      // @ts-ignore
      this.authService.login(this.form.value).subscribe((res) => {
        this.router.navigate(['/dashboard']);
      });
    } else console.log('Form invalid');
  }
}
