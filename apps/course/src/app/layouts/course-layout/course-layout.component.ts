import { Component } from '@angular/core';
import { NavbarCourseComponent } from '../../shared/navigation/navbar-course/navbar-course.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/navigation/footer/footer.component';

@Component({
  selector: 'app-course-layout',
  templateUrl: './course-layout.component.html',
  standalone: true,
  styles: [],
  imports: [NavbarCourseComponent, RouterOutlet, FooterComponent],
})
export class CourseLayoutComponent {}
