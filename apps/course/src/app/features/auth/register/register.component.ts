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
import { passwordMatcher } from '../../../validators/auth/password-matcher.validator';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { AppComponent } from '../../../app.component';
import { usernameTakenValidator } from '../../../validators/auth/username-taken.validator';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastType } from '../../../types/feedback/toast.types';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule, RouterLink],
})
export class RegisterComponent {
  public credentials: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private titleService: Title,
    private afs: AngularFirestore,
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
      `Register - ${environment.metaConfig.title} - ${AppComponent.chorizo.title}`,
    );
  }

  public getErrorMessage(controlName: string): string | null {
    const control = this.credentials.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['email']) {
        return 'Invalid email format';
      }
      if (control.errors['usernameTaken']) {
        return 'Username is already taken, please try another';
      }
      if (control.errors['minlength']) {
        return `Minimum length should be ${control.errors['minlength']['requiredLength']}`;
      }
      if (control.errors['maxlength']) {
        return `Maximum length should be ${control.errors['maxlength']['requiredLength']}`;
      }
      if (control.errors['passwordMatcher']) {
        return 'Passwords do not match';
      }
    }
    return null;
  }

  public async submit() {
    if (!this.credentials.valid) {
      return;
    }

    const { email, password, username } = this.credentials.value;

    try {
      await this.authService.register(email, password, username);
      this.toastService.showToast('Registration successful.', ToastType.Info);
      await this.router.navigate(['/']);
    } catch (error) {
      const message = this.authService.handleAuthError(error);
      this.toastService.showToast(message, ToastType.Error);
    }
  }
}
