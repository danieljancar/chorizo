import { Component, Input } from '@angular/core';
import { User } from '../../../../../../projects/types/src/lib/user.types';

@Component({
  selector: 'app-account-profile-banner',
  standalone: true,
  imports: [],
  templateUrl: './account-profile-banner.component.html',
  styleUrl: './account-profile-banner.component.scss',
})
export class AccountProfileBannerComponent {
  @Input() user: User | undefined;
}
