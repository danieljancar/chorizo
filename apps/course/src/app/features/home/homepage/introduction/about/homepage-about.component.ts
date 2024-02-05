import { Component, Input } from '@angular/core';
import { GeneralMainDocument } from '../../../../../types/general.types';

@Component({
  selector: 'app-homepage-about',
  standalone: true,
  imports: [],
  templateUrl: './homepage-about.component.html',
  styleUrl: './homepage-about.component.scss',
})
export class HomepageAboutComponent {
  @Input() generalMainDocument: GeneralMainDocument | undefined;
}
