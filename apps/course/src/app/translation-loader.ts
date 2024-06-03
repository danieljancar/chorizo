import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { en } from './translations/en.translation';
import { de } from './translations/de.translation';
import { languageEnums } from './enums/language.enums';

export class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: languageEnums): Observable<any> {
    switch (lang) {
      case languageEnums.de:
        return of(de);
      case languageEnums.en:
        return of(en);
      default:
        return of(de);
    }
  }
}
