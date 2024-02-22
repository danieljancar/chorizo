import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export function usernameTakenValidator(
  afs: AngularFirestore,
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return afs
      .collection('users', (ref) => ref.where('username', '==', control.value))
      .valueChanges()
      .pipe(
        take(1),
        map((arr) => (arr.length ? { usernameTaken: true } : null)),
        catchError(() => of(null)),
      );
  };
}
