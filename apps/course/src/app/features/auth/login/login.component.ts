import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../core/feedback/toast.service';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { AppComponent } from '../../../app.component';
import { ToastType } from '../../../types/feedback/toast.types';
import { isReactive } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
})
export class LoginComponent {
  public credentials: FormGroup;
  public isLoggingIn: boolean = false;
  protected readonly isReactive = isReactive;

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
    this.isLoggingIn = true;
    if (!this.credentials.valid) {
      return;
    }

    const { email, password } = this.credentials.value;

    try {
      await this.authService.login(email, password).then(async () => {
        this.isLoggingIn = false;
        await this.router.navigate(['/']);
      });
    } catch (error) {
      const message = this.authService.handleAuthError(error);
      this.toastService.showToast(message, ToastType.Error);
      this.isLoggingIn = false;
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
