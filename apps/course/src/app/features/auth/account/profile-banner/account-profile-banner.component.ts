import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ImageLoaderService } from '../../../../core/util/image-loader.service';

@Component({
  selector: 'app-account-profile-banner',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './account-profile-banner.component.html',
  styleUrl: './account-profile-banner.component.scss',
})
export class AccountProfileBannerComponent implements OnChanges {
  @Input() avatarPath: string | undefined;
  @Input() username: string = '';
  @Output() avatarChange = new EventEmitter<File>();
  @Input() uploading: boolean = false;

  avatarUrl: string | undefined;

  constructor(private imageLoaderService: ImageLoaderService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['avatarPath']?.currentValue) {
      this.loadAvatarUrl(this.avatarPath);
    }
  }

  loadAvatarUrl(path?: string): void {
    if (!path) {
      this.avatarUrl = undefined;
      return;
    }
    this.imageLoaderService
      .getDownloadUrl(path)
      .then((url) => {
        this.avatarUrl = url;
      })
      .catch((error) => console.error('Error loading avatar image:', error));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      this.avatarChange.emit(file);
    }
  }
}
