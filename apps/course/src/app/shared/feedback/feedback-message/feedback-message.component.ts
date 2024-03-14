import { booleanAttribute, Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

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
  @Input() public title: string | undefined = 'Oops!';
  @Input() public message: string | undefined = 'Something went wrong.';
  @Input() public icon: string | undefined = 'warning';
  @Input({ transform: booleanAttribute }) public showIcon: boolean | undefined =
    true;
}
