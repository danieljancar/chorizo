import { Component, Input } from '@angular/core';
import { UserRole } from '../../../../../../../projects/types/src/lib/user.types';

@Component({
  selector: 'app-account-profile-role-badge',
  standalone: true,
  imports: [],
  templateUrl: './account-profile-role-badge.component.html',
})
export class AccountProfileRoleBadgeComponent {
  @Input() role: UserRole | undefined;
  protected readonly UserRole = UserRole;
}
