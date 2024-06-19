import { Component, OnInit } from '@angular/core';
import { LegalInfoComponent } from './legal-info/legal-info.component';
import { LegalMarkdownRendererComponent } from './legal-markdown-renderer/legal-markdown-renderer.component';
import { LegalDocument } from '../../../types/legal.type';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LegalService } from '../../../core/data/legal.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-legal-detail',
  standalone: true,
  imports: [LegalInfoComponent, LegalMarkdownRendererComponent],
  templateUrl: './legal-detail.component.html',
  styleUrl: './legal-detail.component.scss',
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
