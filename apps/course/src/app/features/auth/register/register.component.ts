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
import { passwordMatcher } from '../../../validators/password-matcher.validator';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { AppComponent } from '../../../app.component';
import { usernameTakenValidator } from '../../../validators/username-taken.validator';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastType } from '../../../types/feedback/toast.types';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
})
export class RegisterComponent {
  public credentials: FormGroup;
  public isRegistering: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private titleService: Title,
    private afs: AngularFirestore,
    private t: TranslateService,
  ) {
    this.credentials = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
          [usernameTakenValidator(this.afs)],
        ],
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
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatcher('password', 'confirmPassword') },
    );

    this.titleService.setTitle(
      `${this.t.instant('register.title')} - ${environment.metaConfig.title} - ${AppComponent.chorizo.title}`,
    );
  }

  public getErrorMessage(controlName: string): string | null {
    const control = this.credentials.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return this.t.instant('register.parse-errors.required');
      }
      if (control.errors['email']) {
        return this.t.instant('register.parse-errors.invalid-email');
      }
      if (control.errors['usernameTaken']) {
        return this.t.instant('register.parse-errors.username-taken');
      }
      if (control.errors['minlength']) {
        return this.t.instant('register.parse-errors.min-length', {
          min: control.errors['minlength']['requiredLength'],
        });
      }
      if (control.errors['maxlength']) {
        return this.t.instant('register.parse-errors.max-length', {
          max: control.errors['maxlength']['requiredLength'],
        });
      }
      if (control.errors['passwordMatcher']) {
        return this.t.instant('register.parse-errors.password-mismatch');
      }
    }
    return null;
  }

  public async submit() {
    this.isRegistering = true;
    if (!this.credentials.valid) {
      return;
    }

    const { email, password, username } = this.credentials.value;

    try {
      await this.authService
        .register(email, password, username)
        .then(async () => {
          this.toastService.showToast(
            this.t.instant('register.register-success'),
            ToastType.Success,
          );
          this.isRegistering = false;
          await this.router.navigate(['/']);
        });
    } catch (error) {
      const message = this.authService.handleAuthError(error);
      this.toastService.showToast(message, ToastType.Error);
      this.isRegistering = false;
    }
  }
}
