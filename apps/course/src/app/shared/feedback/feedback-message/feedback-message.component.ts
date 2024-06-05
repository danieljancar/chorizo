import { booleanAttribute, Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-feedback-message',
  standalone: true,
  imports: [MatIcon],
  template: ` <div class="items-center flex flex-col justify-center mt-14">
    @if (showIcon) {
      <mat-icon class="text-2xl mb-3">{{ icon }}</mat-icon>
    }
    @if (title) {
      <h1 class="text-2xl mb-2">{{ title }}</h1>
    }
    <p class="text-lg">
      {{ message }}
    </p>
  </div>`,
})
export class FeedbackMessageComponent {
  @Input() public icon: string = 'warning';
  @Input({ transform: booleanAttribute }) public showIcon: boolean = true;
  @Input() public title: string = this.t.instant(
    'feedback-message.default-title',
  );
  @Input() public message: string = this.t.instant(
    'feedback-message.default-message',
  );

  constructor(private t: TranslateService) {}
}
