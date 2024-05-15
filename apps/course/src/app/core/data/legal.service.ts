import { inject, Injectable } from '@angular/core';
import { Legal, LegalDocument } from '../../types/legal.type';
import * as legalData from '../../../assets/legal/legal.json';
import { ToastService } from '../feedback/toast.service';
import { ToastType } from '../../types/feedback/toast.types';

@Injectable({
  providedIn: 'root',
})
export class LegalService {
  public legals: LegalDocument[] = (legalData as Legal).files;

  getLegalDocumentByFileId(file: string): LegalDocument | undefined {
    return this.legals.find((legal) => {
      if (legal) {
        return legal.file === file;
      } else {
        inject(ToastService).showToast(
          'Could not find the legal document, try again.',
          ToastType.Error,
        );
      }
      return undefined;
    });
  }
}
