import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../../../projects/types/src/lib/user.types';
import { AsyncPipe } from '@angular/common';
import { ToastService } from '../../../core/feedback/toast.service';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { AppComponent } from '../../../app.component';
import { AccountProfileBannerComponent } from './profile-banner/account-profile-banner.component';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';
import { interval, Observable, Subscription } from 'rxjs';
import { ToastType } from '../../../types/feedback/toast.types';
import { UserService } from '../../../core/data/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
    AccountProfileBannerComponent,
    RelativeTimePipe,
  ],
})
export class AccountComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  userProfileForm: FormGroup;
  public user$: Observable<User | null | undefined> =
    this.userService.getCurrentUser();
  avatarIsUploading: boolean = false;
  private subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    private storage: AngularFireStorage,
  ) {
    inject(Title).setTitle(
      `Account - ${environment.metaConfig.title} - ${AppComponent.chorizo.title}`,
    );
    this.userProfileForm = this.formBuilder.group({
      name: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      email: [
        {
          value: '',
          disabled: true,
        },
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
    this.setupUpdateTime();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadUser(): void {
    this.isLoading = true;
    const userSubscription = this.userService.getCurrentUser().subscribe({
      next: (user) => {
        if (user) {
          this.userProfileForm.patchValue(user);
        }
        this.isLoading = false;
      },
      error: () => {
        this.toastService.showToast(
          'Error loading user data.',
          ToastType.Error,
        );
        this.isLoading = false;
      },
    });
    this.subscriptions.add(userSubscription);
  }

  setupUpdateTime(): void {
    const timeUpdateSubscription = interval(60000).subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
    this.subscriptions.add(timeUpdateSubscription);
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

  handleAvatarChange(file: File): void {
    this.avatarIsUploading = true;
    this.userService
      .updateUserAvatar(file)
      .then(() => {
        this.toastService.showToast(
          'Avatar updated successfully.',
          ToastType.Success,
        );
        this.avatarIsUploading = false;
      })
      .catch((error) => {
        console.error('Failed to update avatar:', error);
        this.toastService.showToast(
          'Failed to update avatar, please try again.',
          ToastType.Error,
        );
        this.avatarIsUploading = false;
        this.loadUser();
      });
  }

  submit(): void {
    if (this.userProfileForm.valid) {
      const updatedUserData = this.userProfileForm.value;
      this.userService
        .updateUser(updatedUserData)
        .then(() => {
          this.toastService.showToast(
            'Your profile was updated successfully.',
            ToastType.Success,
          );
          this.loadUser();
        })
        .catch(() => {
          this.toastService.showToast(
            'There was an error updating your profile.',
            ToastType.Error,
          );
        });
    }
  }
}
