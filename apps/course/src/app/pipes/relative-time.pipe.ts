import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'relativeTime',
  standalone: true,
})
export class RelativeTimePipe implements PipeTransform {
  constructor(private t: TranslateService) {}

  transform(value: Date, args?: 'relative' | 'standard'): string {
    if (!value) return '';

    const date: Date = value;

    if (args === 'relative') {
      return this.getRelativeTime(date);
    } else {
      return this.formatDate(date);
    }
  }

  private formatDate(date: Date): string {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${day}. ${this.t.instant(months[monthIndex])} ${year}`;
  }

  private getRelativeTime(date: Date): string {
    const now = new Date();
    const elapsed = now.getTime() - date.getTime();

    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return this.t.instant('relativeTimePipe.just-now');
    } else if (minutes < 60) {
      return minutes === 1
        ? this.t.instant('relativeTimePipe.minute-ago')
        : this.t.instant('relativeTimePipe.minutes-ago', { minutes });
    } else if (hours < 24) {
      return hours === 1
        ? this.t.instant('relativeTimePipe.hour-ago')
        : this.t.instant('relativeTimePipe.hours-ago', { hours });
    } else if (days < 7) {
      return days === 1
        ? this.t.instant('relativeTimePipe.day-ago')
        : this.t.instant('relativeTimePipe.days-ago', { days });
    } else {
      return this.formatDate(date);
    }
  }
}
