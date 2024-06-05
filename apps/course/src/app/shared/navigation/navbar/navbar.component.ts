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
import { LanguageService } from '../../../core/util/language.service';

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
  public isLoggedIn$: Observable<boolean>;
  public title: string = environment.metaConfig.title;
  public isAccountDropDown: boolean = false;
  public isLangDropDown: boolean = false;
  public languages: (keyof LanguageNames)[] = [];
  public currentLang: string;
  public languageNames: LanguageNames = languageNames;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private languageService: LanguageService,
    private t: TranslateService,
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentLang = this.languageService.currentLang;
  }

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/a/login']).then(() => {
        this.toastService.showToast(
          this.t.instant('navbar.logout-success'),
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
    this.languageService.changeLang(lang);
    this.toggleLangDropdown();
  }

  closeDropdown(): void {
    this.isAccountDropDown = false;
  }
}
