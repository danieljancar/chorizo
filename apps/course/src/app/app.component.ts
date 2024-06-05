import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from './core/feedback/toast.service';
import { NgClass } from '@angular/common';
import { NavbarCourseComponent } from './shared/navigation/navbar-course/navbar-course.component';
import { NavbarComponent } from './shared/navigation/navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';
import { FooterComponent } from './shared/navigation/footer/footer.component';
import { ToastType } from './types/feedback/toast.types';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    NavbarCourseComponent,
    NavbarComponent,
    MatIcon,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  static readonly chorizo = {
    title: 'Chorizo',
    subtitle: 'A firebase self hosted course platform',
    description:
      'Chorizo is a self hosted course platform that allows you to host your own courses and content.',
    links: {
      github: 'https://github.com/danieljancar/chorizo',
    },
  };
  isBigScreen: boolean;
  protected readonly ToastType = ToastType;
  private defaultLanguage: string = 'de';

  constructor(
    public toastService: ToastService,
    private translate: TranslateService,
  ) {
    this.translate.use(this.defaultLanguage);
    this.isBigScreen = window.innerWidth > 640;
  }
}
