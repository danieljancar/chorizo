import { Component, OnInit } from '@angular/core';
import { LegalInfoComponent } from './legal-info/legal-info.component';
import { LegalMarkdownRendererComponent } from './legal-markdown-renderer/legal-markdown-renderer.component';
import { LegalDocument } from '../../../types/legal.type';
import { ActivatedRoute, Router } from '@angular/router';
import { LegalService } from '../../../core/data/legal.service';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { AppComponent } from '../../../app.component';
import { ToastService } from '../../../core/feedback/toast.service';
import { ToastType } from '../../../types/feedback/toast.types';

@Component({
  selector: 'app-legal-detail',
  standalone: true,
  imports: [LegalInfoComponent, LegalMarkdownRendererComponent],
  templateUrl: './legal-detail.component.html',
  styleUrl: './legal-detail.component.scss',
})
export class LegalDetailComponent implements OnInit {
  public legal: LegalDocument | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private legalService: LegalService,
    private title: Title,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    const legalId = this.route.snapshot.paramMap.get('legalId');
    if (legalId) {
      this.legal = this.legalService.getLegalDocumentByFileId(legalId);
      if (this.legal) {
        {
          this.title.setTitle(
            this.legal.name +
              ' - ' +
              environment.metaConfig.title +
              ' - ' +
              AppComponent.chorizo.title,
          );
        }
      } else {
        this.router.navigate(['/404']).then(() => {
          this.toastService.showToast(
            'The document could not be found.',
            ToastType.Error,
          );
        });
      }
    }
  }
}
