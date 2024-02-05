import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { HomepageMarkdownRendererComponent } from './introduction/markdown-renderer/homepage-markdown-renderer.component';
import { HomepageSubnavbarComponent } from './subnavbar/homepage-subnavbar.component';
import { HomepageAboutComponent } from './introduction/about/homepage-about.component';
import { LatestCoursesComponent } from './latest-courses/latest-courses.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    HomepageMarkdownRendererComponent,
    HomepageSubnavbarComponent,
    HomepageAboutComponent,
    LatestCoursesComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {}
