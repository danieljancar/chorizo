import { Component, Input } from '@angular/core';
import { Legal } from '../../../../types/legal.type';

@Component({
  selector: 'app-legal-info',
  standalone: true,
  imports: [],
  templateUrl: './legal-info.component.html',
  styleUrl: './legal-info.component.scss',
})
export class LegalInfoComponent {
  @Input() legal: Legal | undefined;
}
