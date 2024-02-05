import { Component } from '@angular/core';
import { GeneralService } from '../../../../core/data/general.service';
import { MainDoc } from '../../../../types/general.types';

@Component({
  selector: 'app-homepage-markdown-renderer',
  standalone: true,
  imports: [],
  templateUrl: './homepage-markdown-renderer.component.html',
  styleUrl: './homepage-markdown-renderer.component.scss',
})
export class HomepageMarkdownRendererComponent {
  mainDoc: MainDoc | unknown;

  constructor(private generalService: GeneralService) {
    this.generalService.getMainDoc().subscribe((mainDoc) => {
      this.mainDoc = mainDoc;
    });
  }
}
