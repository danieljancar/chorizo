import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RelativeTimePipe } from '../../../../../pipes/relative-time.pipe';

@Component({
  selector: 'app-course-skeleton-resources',
  standalone: true,
  imports: [MatIcon, RelativeTimePipe],
  template: ` <div class="overflow-x-auto">
    <table class="table table-lg">
      <thead>
        <tr>
          <th>
            <mat-icon>insert_drive_file</mat-icon>
          </th>
          <th>
            <button class="flex items-center btn btn-sm btn-ghost">
              Name
              <mat-icon> keyboard_arrow_down</mat-icon>
            </button>
          </th>
          <th>
            <button class="flex items-center btn btn-sm btn-ghost">
              Last Modified
              <mat-icon> keyboard_arrow_down</mat-icon>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        @for (resource of [1, 2, 3, 4, 5]; track $index) {
          <tr>
            <td>
              <mat-icon>insert_drive_file</mat-icon>
            </td>
            <td>
              <div class="skeleton w-full h-10"></div>
            </td>
            <td>
              <div class="skeleton w-5/6 h-8"></div>
            </td>
          </tr>
        }
      </tbody>
    </table>
  </div>`,
  styles: [],
})
export class CourseSkeletonResourcesComponent {}
