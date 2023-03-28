import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Credentials } from '../../models/credentials.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.fb.group({
    email: [
      { value: 'peron.user', disabled: true },
      [Validators.email, Validators.required],
    ],
    password: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  onSubmit(): void {
    if (this.form.valid) {
      const value = this.form.value as Credentials;
      this.authService.login(value);
    }
  }
}
