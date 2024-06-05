import { Component, Input } from '@angular/core';
import { GeneralMainDocument } from '../../../../../types/general.types';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-homepage-about',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './homepage-about.component.html',
  styleUrl: './homepage-about.component.scss',
})
export class HomepageAboutComponent {
  @Input() generalMainDocument: GeneralMainDocument | undefined;
}
