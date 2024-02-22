import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../../../projects/types/src/lib/user.types';
import { AsyncPipe } from '@angular/common';
import { ToastService } from '../../../core/utility/toast.service';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-account',
  standalone: true,
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    LoadingBarsComponent,
    MatIcon,
    RouterLink,
  ],
})
export class AccountComponent implements OnInit {
  isLoading: boolean = false;
  userProfileForm: FormGroup;
  user$: Promise<User | null> = Promise.resolve(null);

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
  ) {
    inject(Title).setTitle(
      'Account - ' +
        environment.metaConfig.title +
        ' - ' +
        AppComponent.chorizo.title,
    );
    this.userProfileForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
      ],
      bio: ['', [Validators.minLength(3), Validators.maxLength(800)]],
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.isLoading = true;
    this.user$ = this.authService.getCurrentUser();
    this.user$
      .then((user) => {
        if (user) {
          this.userProfileForm.patchValue(user);
          this.isLoading = false;
        }
      })
      .catch(() => {
        this.toastService.showToast('Error loading user data.', 'error');
        this.isLoading = false;
      });
  }

  public getErrorMessage(controlName: string): string | null {
    const control = this.userProfileForm.get(controlName);
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
      if (control.errors['bio']) {
        return 'Bio should be between 3 and 800 characters';
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

  submit(): void {
    if (this.userProfileForm.valid) {
      const updatedUserData = this.userProfileForm.value;
      this.authService
        .updateUser(updatedUserData)
        .then(() => {
          this.toastService.showToast('User updated successfully.', 'success');
          this.loadUser(); // Refresh user data
        })
        .catch(() => {
          this.toastService.showToast('Error updating user data.', 'error');
        });
    }
  }
}
