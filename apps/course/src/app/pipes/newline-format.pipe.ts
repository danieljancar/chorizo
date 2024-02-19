import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newlineFormat',
  standalone: true,
})
export class NewlineFormatPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }
    return value.replaceAll(/\\n/g, '\n');
  }
}
