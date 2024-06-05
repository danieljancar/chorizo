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
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
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
    private t: TranslateService,
    private titleService: Title,
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
      `${this.t.instant('login.title')} - ${environment.metaConfig.title} - ${AppComponent.chorizo.title}`,
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

  public parseErrors(controlName: string): string | null {
    const control = this.credentials.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return this.t.instant('login.parse-errors.required');
      }
      if (control.errors['email']) {
        return this.t.instant('login.parse-errors.invalid-email');
      }
      if (control.errors['minlength']) {
        return this.t.instant('login.parse-errors.min-length', {
          min: control.errors['minlength']['requiredLength'],
        });
      }
      if (control.errors['maxlength']) {
        return this.t.instant('login.parse-errors.max-length', {
          max: control.errors['maxlength']['requiredLength'],
        });
      }
    }
    return null;
  }
}
