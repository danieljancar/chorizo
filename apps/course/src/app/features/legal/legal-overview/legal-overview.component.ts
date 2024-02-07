import {Component, OnInit} from '@angular/core';
import {LegalService} from "../legal.service";

@Component({
  selector: 'app-legal-overview',
  standalone: true,
  imports: [],
  templateUrl: './legal-overview.component.html',
  styleUrl: './legal-overview.component.scss'
})
export class LegalOverviewComponent {
  constructor(private legalService: LegalService) { }

}
