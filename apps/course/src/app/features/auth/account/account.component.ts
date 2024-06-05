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
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    TranslateModule,
  ],
})
export class AccountComponent implements OnInit, OnDestroy {
  isLoading = false;
  userProfileForm: FormGroup;
  user$: Observable<User | null | undefined> =
    this.userService.getCurrentUser();
  avatarIsUploading = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    private t: TranslateService,
  ) {
    this.setTitle();
    this.userProfileForm = this.initUserProfileForm();
  }

  ngOnInit(): void {
    this.loadUser();
    this.setupUpdateTime();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getErrorMessage(controlName: string): string | null {
    const control = this.userProfileForm.get(controlName);
    return control && control.touched && control.errors
      ? this.parseErrors(control.errors)
      : null;
  }

  handleAvatarChange(file: File): void {
    this.avatarIsUploading = true;
    this.userService
      .updateUserAvatar(file)
      .then(() => {
        this.toastService.showToast(
          this.t.instant('account.update-avatar-success'),
          ToastType.Success,
        );
        this.avatarIsUploading = false;
      })
      .catch(() => {
        this.toastService.showToast(
          this.t.instant('account.update-avatar-error'),
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
            this.t.instant('account.update-profile-success'),
            ToastType.Success,
          );
          this.loadUser();
        })
        .catch(() => {
          this.toastService.showToast(
            this.t.instant('account.update-profile-error'),
            ToastType.Error,
          );
        });
    }
  }

  public loadUser(): void {
    this.isLoading = true;
    this.clearUserForm();
    const userSubscription = this.user$.subscribe({
      next: (user) => {
        if (user) {
          this.userProfileForm.patchValue(user);
        }
        this.isLoading = false;
      },
      error: () => {
        this.toastService.showToast(
          this.t.instant('account.load-user-data-error'),
          ToastType.Error,
        );
        this.isLoading = false;
      },
    });
    this.subscriptions.add(userSubscription);
  }

  private setTitle(): void {
    const titleService = inject(Title);
    titleService.setTitle(
      `${this.t.instant('account.account')} - ${environment.metaConfig.title} - ${AppComponent.chorizo.title}`,
    );
  }

  private initUserProfileForm(): FormGroup {
    return this.formBuilder.group({
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

  private clearUserForm(): void {
    this.userProfileForm.reset();
  }

  private setupUpdateTime(): void {
    const timeUpdateSubscription = interval(60000).subscribe(() =>
      this.changeDetectorRef.markForCheck(),
    );
    this.subscriptions.add(timeUpdateSubscription);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private parseErrors(errors: any): string {
    if (errors['required']) {
      return this.t.instant('account.parse-errors.required');
    }
    if (errors['username']) {
      return this.t.instant('account.parse-errors.invalid-username');
    }
    if (errors['email']) {
      return this.t.instant('account.parse-errors.invalid-email');
    }
    if (errors['bio']) {
      return this.t.instant('account.parse-errors.bio-length');
    }
    if (errors['minlength']) {
      return this.t.instant('account.parse-errors.min-length', {
        min: errors['minlength']['requiredLength'],
      });
    }
    if (errors['maxlength']) {
      return this.t.instant('account.parse-errors.max-length', {
        max: errors['maxlength']['requiredLength'],
      });
    }
    return 'Unknown error';
  }
}
