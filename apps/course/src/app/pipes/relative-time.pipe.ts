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
    const monthTranslationKey = `relativeTimePipe.months.${this.getMonthName(monthIndex)}`;
    return `${day}. ${this.t.instant(monthTranslationKey)} ${year}`;
  }

  private getMonthName(monthIndex: number): string {
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
    return months[monthIndex];
  }

  private getRelativeTime(date: Date): string {
    const now = new Date();
    const elapsed = now.getTime() - date.getTime();

    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

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
    } else if (days < 30) {
      return days === 1
        ? this.t.instant('relativeTimePipe.day-ago')
        : this.t.instant('relativeTimePipe.days-ago', { days });
    } else if (months < 12) {
      return months === 1
        ? this.t.instant('relativeTimePipe.month-ago')
        : this.t.instant('relativeTimePipe.months-ago', { months });
    } else {
      return years === 1
        ? this.t.instant('relativeTimePipe.year-ago')
        : this.t.instant('relativeTimePipe.years-ago', { years });
    }
  }
}
