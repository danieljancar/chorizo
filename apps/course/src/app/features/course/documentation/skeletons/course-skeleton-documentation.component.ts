import { Component } from '@angular/core';

@Component({
  selector: 'app-course-skeleton-documentation',
  standalone: true,
  imports: [],
  template: ` <div class="flex flex-col">
    <div class="skeleton w-2/3 h-10 mb-2"></div>
    <div class="skeleton w-full h-40 mb-1"></div>
    <div class="skeleton w-full h-20 mb-1"></div>
    <div class="skeleton w-full h-32 mb-1"></div>
  </div>`,
  styles: [''],
})
export class CourseSkeletonDocumentationComponent {}
