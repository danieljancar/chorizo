import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from './core/feedback/toast.service';
import { NgClass } from '@angular/common';
import { NavbarCourseComponent } from './shared/navigation/navbar-course/navbar-course.component';
import { NavbarComponent } from './shared/navigation/navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';
import { FooterComponent } from './shared/navigation/footer/footer.component';
import { ToastType } from './types/feedback/toast.types';

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

  constructor(public toastService: ToastService) {
    this.isBigScreen = window.innerWidth > 640;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onActivate() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}

export const Link = {
  send: 'href',
};
