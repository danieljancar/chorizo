import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { AuthService } from '../../../core/auth/auth.service';
import { AsyncPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ToastService } from '../../../core/feedback/toast.service';
import { environment } from '../../../../environments/environment';
import { ToastType } from '../../../types/feedback/toast.types';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { languageNames, LanguageNames } from '../../../names/language.names';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatNavList,
    AsyncPipe,
    TranslateModule,
    SlicePipe,
    UpperCasePipe,
  ],
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  title: string = environment.metaConfig.title;
  isAccountDropDown: boolean = false;
  isLangDropDown: boolean = false;
  languages: (keyof LanguageNames)[] = [];
  public currentLang: string = this.translateService.currentLang;
  languageNames: LanguageNames = languageNames;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private translateService: TranslateService,
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit() {
    this.languages = Object.keys(this.languageNames) as (keyof LanguageNames)[];
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/a/login']).then(() => {
        this.toastService.showToast(
          'Logged out successfully.',
          ToastType.Success,
        );
      });
    });
  }

  toggleAccountDropdown(): void {
    this.isAccountDropDown = !this.isAccountDropDown;
  }

  toggleLangDropdown(): void {
    this.isLangDropDown = !this.isLangDropDown;
  }

  changeLang(lang: string): void {
    this.toggleLangDropdown();
    this.translateService.use(lang);
    this.toastService.showToast(
      this.translateService.instant('language-change-success'),
      ToastType.Success,
    );
  }

  closeDropdown(): void {
    this.isAccountDropDown = false;
  }
}
