import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function passwordMatcher(
  controlName: string,
  matchingControlName: string,
): ValidatorFn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (control: AbstractControl): { [key: string]: any } | null => {
    const formGroup = control as FormGroup;
    const controlToMatch = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (!controlToMatch || !matchingControl) {
      return null;
    }

    if (matchingControl.errors && !matchingControl.errors['passwordMatcher']) {
      return null;
    }

    if (controlToMatch.value !== matchingControl.value) {
      matchingControl.setErrors({ passwordMatcher: true });
      return null;
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}
