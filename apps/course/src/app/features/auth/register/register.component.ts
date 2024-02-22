import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../core/utility/toast.service';
import { usernameTakenValidator } from '../../../validators/username-taken.validator';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public credentials: FormGroup = this.formBuilder.group({
    username: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      [usernameTakenValidator(inject(AngularFirestore))],
    ],
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
    confirmPassword: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(99)],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
  ) {
    inject(Title).setTitle(
      'Register - ' +
        environment.metaConfig.title +
        ' - ' +
        AppComponent.chorizo.title,
    );
  }

  public getErrorMessage(controlName: string): string | null {
    const control = this.credentials.get(controlName);
    if (control && control.touched && control.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['username']) {
        return 'Invalid username format';
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

  public async submit() {
    if (!this.credentials.valid) {
      return;
    }

    const { email, password, confirmPassword, username } =
      this.credentials.value;

    if (password !== confirmPassword) {
      this.toastService.showToast(
        'Passwords do not match, please try again.',
        'error',
      );
      return;
    }

    try {
      const exists = await this.authService.emailExists(email);
      if (exists) {
        this.toastService.showToast(
          'This account already exists, please log in.',
          'error',
        );
        await this.router.navigate(['/a/login']);
        return;
      }

      await this.authService.register(email, password, username);
      this.toastService.showToast('Registration successful.', 'success');
      await this.router.navigate(['/']);
    } catch (error) {
      await this.handleError(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async handleError(error: any) {
    if (error.code === 'auth/email-already-in-use') {
      this.toastService.showToast(
        'This email is already in use, please try another.',
        'error',
      );
    } else {
      this.toastService.showToast('Error occurred, please try again.', 'error');
    }
  }
}
