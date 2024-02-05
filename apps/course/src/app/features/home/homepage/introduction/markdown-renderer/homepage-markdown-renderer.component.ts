import { Component, SecurityContext, ViewEncapsulation } from '@angular/core';
import { GeneralService } from '../../../../../core/data/general.service';
import {
  MarkdownComponent,
  MarkdownService,
  provideMarkdown,
} from 'ngx-markdown';
import { LoadingBarsComponent } from '../../../../../shared/loading-bars/loading-bars.component';
import { map, switchMap } from 'rxjs/operators';
import { GeneralMainDocument } from '../../../../../types/general.types';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { HomepageAboutComponent } from '../about/homepage-about.component';
import { FeedbackMessageComponent } from '../../../../../shared/feedback-message/feedback-message.component';

@Component({
  selector: 'app-homepage-markdown-renderer',
  standalone: true,
  imports: [
    MarkdownComponent,
    LoadingBarsComponent,
    JsonPipe,
    HomepageAboutComponent,
    FeedbackMessageComponent,
  ],
  templateUrl: './homepage-markdown-renderer.component.html',
  styleUrls: ['./homepage-markdown-renderer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    provideMarkdown({
      loader: HttpClient,
      sanitize: SecurityContext.NONE,
    }),
  ],
})
export class HomepageMarkdownRendererComponent {
  generalMainDocument: GeneralMainDocument | undefined;
  isLoading: boolean = true;

  constructor(
    private generalService: GeneralService,
    private markdownService: MarkdownService,
  ) {
    this.generalService
      .getMainDoc()
      .pipe(
        map((mainDoc) => mainDoc as GeneralMainDocument | undefined),
        map((mainDoc) => {
          const doc = mainDoc as GeneralMainDocument | undefined;
          if (doc?.markdown) {
            doc.markdown = doc.markdown.replace(/\\n/g, '\n');
          }
          return doc;
        }),
        switchMap((mainDoc) => {
          this.generalMainDocument = mainDoc;
          return this.markdownService.getSource(
            this.generalMainDocument?.markdown || '',
          );
        }),
      )
      .subscribe(() => {
        this.isLoading = false;
      });
  }
}
