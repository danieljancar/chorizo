import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { languageEnums } from './enums/language.enums';
import { de } from './translations/de.translations';
import { en } from './translations/en.translations';
import { fr } from './translations/fr.translations';
import { it } from './translations/it.translations';
import { es } from './translations/es.translations';
import { ru } from './translations/ru.translations';
import { ja } from './translations/ja.translations';
import { pt } from './translations/pt.translations';

export class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: languageEnums): Observable<any> {
    switch (lang) {
      case languageEnums.en:
        return of(en);
      case languageEnums.de:
        return of(de);
      case languageEnums.fr:
        return of(fr);
      case languageEnums.it:
        return of(it);
      case languageEnums.es:
        return of(es);
      case languageEnums.ru:
        return of(ru);
      case languageEnums.pt:
        return of(pt);
      case languageEnums.ja:
        return of(ja);
      default:
        return of(en);
    }
  }
}
