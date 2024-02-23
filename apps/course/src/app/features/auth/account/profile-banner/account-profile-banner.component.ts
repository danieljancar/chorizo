import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-account-profile-banner',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './account-profile-banner.component.html',
  styleUrl: './account-profile-banner.component.scss',
})
export class AccountProfileBannerComponent {
  @Input() avatar: string | undefined;
  @Input() username: string = '';
  @Output() avatarChange = new EventEmitter<File>();
  @Input() uploading: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      this.avatarChange.emit(file);
    }
  }
}
