import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HomepageMarkdownRendererComponent } from './markdown-renderer/homepage-markdown-renderer.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, HomepageMarkdownRendererComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {}
