import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LegalDocument } from '../../../types/legal.type';
import { LegalService } from '../../../core/data/legal.service';
import { LegalInfoComponent } from './legal-info/legal-info.component';
import { LegalMarkdownRendererComponent } from './legal-markdown-renderer/legal-markdown-renderer.component';
import { AsyncPipe } from '@angular/common';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';

@Component({
  selector: 'app-legal-detail',
  templateUrl: './legal-detail.component.html',
  standalone: true,
  styleUrls: ['./legal-detail.component.scss'],
  imports: [
    LegalInfoComponent,
    LegalMarkdownRendererComponent,
    AsyncPipe,
    RouterLink,
    LoadingBarsComponent,
  ],
})
export class LegalDetailComponent implements OnInit {
  legalDocument$: Observable<LegalDocument | undefined> = of(undefined);
  safeLegalDocument: LegalDocument | undefined = undefined;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private legalService: LegalService,
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.legalDocument$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const legalId = params.get('legalId'); // Use the ID from the route parameter
        if (legalId) {
          return this.legalService
            .getLegalDocumentById(legalId)
            .pipe(map((document) => document ?? undefined));
        } else {
          return of(undefined);
        }
      }),
    );

    this.legalDocument$.subscribe((document) => {
      this.safeLegalDocument = document;
    });
  }
}
