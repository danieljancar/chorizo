import {
  Component,
  Input,
  OnInit,
  SecurityContext,
  ViewEncapsulation,
} from '@angular/core';
import {
  CLIPBOARD_OPTIONS,
  ClipboardButtonComponent,
  MarkdownComponent,
  provideMarkdown,
} from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from '../../../../shared/navigation/footer/footer.component';
import { LoadingBarsComponent } from '../../../../shared/feedback/loading-bars/loading-bars.component';
import { LegalDocument } from '../../../../types/legal.type';

@Component({
  selector: 'app-legal-markdown-renderer',
  standalone: true,
  imports: [FooterComponent, LoadingBarsComponent, MarkdownComponent],
  providers: [
    provideMarkdown({
      loader: HttpClient,
      sanitize: SecurityContext.NONE,
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: {
          buttonComponent: ClipboardButtonComponent,
        },
      },
    }),
  ],
  templateUrl: './legal-markdown-renderer.component.html',
  styleUrl: './legal-markdown-renderer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LegalMarkdownRendererComponent implements OnInit {
  @Input() public legal: LegalDocument | undefined;

  constructor() {}

  ngOnInit(): void {}
}
