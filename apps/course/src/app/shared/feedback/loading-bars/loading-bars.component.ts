import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-bars',
  templateUrl: './loading-bars.component.html',
  styleUrls: ['./loading-bars.component.scss'],
  standalone: true
})
export class LoadingBarsComponent {
  @Input() size: string = 'lg';
  @Input() marginTop: string = '50';
  @Input() marginBottom: string = '50';
  @Input() loadingText: string = '';

  constructor() {}

  shouldShowLoadingText(): boolean {
    return !!this.loadingText;
  }
}
