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
  MarkdownService,
  provideMarkdown,
} from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from '../../../../shared/navigation/footer/footer.component';
import { Legal } from '../../../../types/legal.type';
import { LoadingBarsComponent } from '../../../../shared/feedback/loading-bars/loading-bars.component';
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
  public isLoading: boolean = true;

  constructor(private markdownService: MarkdownService) {}

  ngOnInit() {
    const mdPath: string = `assets/legal/content/${this.legal?.file}.md`;
    this.markdownService.getSource(mdPath).subscribe(() => {
      this.isLoading = false;
    });
  }
}
