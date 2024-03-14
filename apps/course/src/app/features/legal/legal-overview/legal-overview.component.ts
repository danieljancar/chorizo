import { Component, OnInit } from '@angular/core';
import { LegalService } from '../../../core/legal.service';
import { Legal } from '../../../types/legal.type';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AppComponent } from '../../../app.component';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';
import {Component, OnInit} from '@angular/core';
import {LegalService} from "../legal.service";
import { Component, OnInit } from '@angular/core';
import { LegalService } from '../../../core/data/legal.service';
import { LegalDocument } from '../../../types/legal.type';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AppComponent } from '../../../app.component';
import { LoadingBarsComponent } from '../../../shared/feedback/loading-bars/loading-bars.component';

@Component({
  selector: 'app-legal-overview',
  standalone: true,
  imports: [RouterLink, LoadingBarsComponent],
  templateUrl: './legal-overview.component.html',
  styleUrl: './legal-overview.component.scss',
})
export class LegalOverviewComponent implements OnInit {
  legal: Legal[] = [];
  public isLoading = true;

  constructor(
    private legalService: LegalService,
    private titleService: Title,
  ) {
    this.titleService.setTitle(
      'Legal - ' +
        environment.metaConfig.title +
        ' - ' +
        AppComponent.chorizo.title,
    );
  }

  imports: [RouterLink, LoadingBarsComponent],
  templateUrl: './legal-overview.component.html',
  styleUrl: './legal-overview.component.scss',
})
export class LegalOverviewComponent implements OnInit {
  legalDocuments: LegalDocument[] = [];
  public isLoading = true;

  constructor(
    private legalService: LegalService,
    private titleService: Title,
  ) {
    this.titleService.setTitle(
      'Legal - ' +
        environment.metaConfig.title +
        ' - ' +
        AppComponent.chorizo.title,
    );
  }

  ngOnInit() {
    this.legalDocuments = this.legalService.legals;
    this.isLoading = false;
  }
  ngOnInit() {
    this.initializeLegalData();
  }

  initializeLegalData() {
    this.legal = this.legalService.getLegals();
    this.isLoading = false;
  }
}
