import { Component, OnInit } from '@angular/core';
import { LegalDocument } from '../../../types/legal.type';
import { RouterLink } from '@angular/router';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LegalService } from '../../../core/data/legal.service';

@Component({
  selector: 'app-legal-overview',
  standalone: true,
  imports: [RouterLink, LoadingBarsComponent, AsyncPipe],
  templateUrl: './legal-overview.component.html',
  styleUrl: './legal-overview.component.scss',
})
export class LegalOverviewComponent implements OnInit {
  legalDocuments$: Observable<LegalDocument[]>;
  isLoading = true;

  constructor(private legalService: LegalService) {
    this.legalDocuments$ = this.legalService.getLegalDocuments();
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  openUrl(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
