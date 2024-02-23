import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-profile-banner',
  standalone: true,
  imports: [],
  templateUrl: './account-profile-banner.component.html',
  styleUrl: './account-profile-banner.component.scss',
})
export class AccountProfileBannerComponent {
  @Input() avatar: string | undefined;
  @Input() username: string = '';
}
