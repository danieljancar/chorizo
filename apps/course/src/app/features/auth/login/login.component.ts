import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/utility/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    NavbarComponent,
  ],
})
export class LoginComponent {
  credentials: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
  ) {
    this.credentials = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(99),
        ],
      ],
    });
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.credentials.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['email']) {
        return 'Invalid email format';
      }
      if (control.errors['minlength']) {
        return `Minimum length should be ${control.errors['minlength']['requiredLength']}`;
      }
      if (control.errors['maxlength']) {
        return `Maximum length should be ${control.errors['maxlength']['requiredLength']}`;
      }
    }
    return null;
  }

  async submit() {
    if (this.credentials.valid) {
      const { email, password } = this.credentials.value;
      if (email && password) {
        try {
          await this.authService.login(email, password);
          await this.router.navigate(['/']).then(() => {
            this.toastService.showToast('Logged in successfully', 'success');
          });
        } catch (error) {
          this.toastService.showToast(
            'Error logging in, please try again.',
            'error',
          );
        }
      }
    }
  }
}
