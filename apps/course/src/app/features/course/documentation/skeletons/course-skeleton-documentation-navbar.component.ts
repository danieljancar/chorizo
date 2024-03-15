import { Component } from '@angular/core';

@Component({
  selector: 'app-course-skeleton-documentation-navbar',
  standalone: true,
  imports: [],
  template: ` <div class="flex flex-col">
    @for (ghost of [1, 2, 3]; track $index) {
      <div class="flex flex-col mb-2.5">
        <div class="skeleton w-2/3 h-6 mt-3 mb-1.5"></div>
        @for (ghost of [1, 2, 3]; track $index) {
          <div class="skeleton w-full h-7 mb-0.5"></div>
        }
      </div>
    }
  </div>`,
  styles: [''],
})
export class CourseSkeletonDocumentationNavbarComponent {}
