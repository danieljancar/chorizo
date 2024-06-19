import { Component, Input, OnInit } from '@angular/core';
import { LegalDocument } from '../../../../types/legal.type';

@Component({
  selector: 'app-legal-info',
  standalone: true,
  imports: [],
  templateUrl: './legal-info.component.html',
  styleUrl: './legal-info.component.scss',
})
export class LegalInfoComponent implements OnInit {
  @Input() public legal: LegalDocument | undefined;

  constructor() {}

  ngOnInit(): void {}
}
