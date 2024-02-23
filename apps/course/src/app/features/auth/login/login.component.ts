import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../core/utility/toast.service';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
})
export class LoginComponent {
  public credentials: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    titleService: Title,
  ) {
    this.credentials = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(4),
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

    titleService.setTitle(
      `Login - ${environment.metaConfig.title} - ${AppComponent.chorizo.title}`,
    );
  }

  public async submit() {
    if (!this.credentials.valid) {
      return;
    }

    const { email, password } = this.credentials.value;

    try {
      await this.authService.login(email, password);
      this.toastService.showToast('Logged in successfully.', 'success');
      await this.router.navigate(['/']);
    } catch (error) {
      const message = this.authService.handleAuthError(error);
      this.toastService.showToast(message, 'error');
    }
  }

  public getErrorMessage(controlName: string): string | null {
    const control = this.credentials.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['email']) {
        return 'Invalid email format, please try another.';
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
}
