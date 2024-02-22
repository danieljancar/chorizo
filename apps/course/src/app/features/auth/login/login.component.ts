import { Component, inject } from '@angular/core';
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
import { NavbarComponent } from '../../../shared/navigation/navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
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
    RouterLink,
  ],
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  credentials: FormGroup = this.formBuilder.group({
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
      [Validators.required, Validators.minLength(6), Validators.maxLength(99)],
    ],
  });
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  getErrorMessage(controlName: string): string | null {
    const control = this.credentials.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['email']) {
        return 'Invalid email format';
      }
      return control.errors['minlength'] || control.errors['maxlength'];
    }
    return null;
  }

  async submit() {
    if (!this.credentials.valid) {
      return;
    }

    const { email, password } = this.credentials.value;

    try {
      await this.authService.login(email, password);
      await this.router.navigate(['/']);
    } catch (error) {
      this.handleError(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleError(error: any) {
    let message = 'Error logging in, please try again.';
    if (
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/wrong-password' ||
      error.code === 'auth/invalid-credential'
    ) {
      message = 'Incorrect email or password, please try again.';
    }

    this.toastService.showToast(message, 'error');
  }
}
