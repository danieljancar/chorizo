import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { languageEnums } from './enums/language.enums';
import { de } from './translations/de.translations';
import { en } from './translations/en.translations';

export class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: languageEnums): Observable<any> {
    switch (lang) {
      case languageEnums.en:
        return of(en);
      case languageEnums.de:
        return of(de);
      default:
        return of(en);
    }
  }
}
