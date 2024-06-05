import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageNames, languageNames } from '../../names/language.names';
import { ToastService } from '../feedback/toast.service';
import { ToastType } from '../../types/feedback/toast.types';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  languageNames: LanguageNames = languageNames;
  private readonly LANG_KEY = 'preferredLang';

  constructor(
    private translate: TranslateService,
    private toastService: ToastService,
  ) {
    const preferredLang = localStorage.getItem(this.LANG_KEY) || 'en';
    this.translate.use(preferredLang);
  }

  get currentLang(): string {
    return this.translate.currentLang;
  }

  changeLang(lang: string): void {
    this.translate.use(lang).subscribe(
      () => {
        localStorage.setItem(this.LANG_KEY, lang);
        this.toastService.showToast(
          this.translate.instant('language-change-success'),
          ToastType.Success,
        );
      },
      () => {
        this.toastService.showToast(
          this.translate.instant('language-change-error'),
          ToastType.Error,
        );
      },
    );
  }

  getLanguages(): (keyof LanguageNames)[] {
    return Object.keys(this.languageNames) as (keyof LanguageNames)[];
  }
}
