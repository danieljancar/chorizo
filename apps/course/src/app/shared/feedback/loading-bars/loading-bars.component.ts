import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-bars',
  standalone: true,
  imports: [],
  templateUrl: './loading-bars.component.html',
  styleUrl: './loading-bars.component.scss',
})
export class LoadingBarsComponent {
  @Input() size: string = 'lg';
  @Input() marginTop: string = '50';
  @Input() marginBottom: string = '50';
}
