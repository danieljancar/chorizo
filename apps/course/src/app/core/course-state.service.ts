import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Course } from '../../../projects/types/src/lib/course.types';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastService } from './feedback/toast.service';
import { ToastType } from '../types/feedback/toast.types';

@Injectable({
  providedIn: 'root',
})
export class CourseStateService {
  public currentCourseId: string | undefined;
  private currentCourseSubject = new ReplaySubject<Course | undefined>(1);
  currentCourse$: Observable<Course | undefined> =
    this.currentCourseSubject.asObservable();
  private lastCourseId: string | null = null;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private toastService: ToastService,
  ) {}

  setCurrentCourse(courseId: string): void {
    if (this.lastCourseId !== courseId) {
      this.lastCourseId = courseId;
      this.currentCourseSubject.next(undefined);
      this.afs
        .doc<Course>(`courses/${courseId}`)
        .valueChanges({ idField: 'id' })
        .subscribe((course) => {
          if (course?.title) {
            this.currentCourseSubject.next(course);
            this.currentCourseId = course.id;
          } else {
            this.currentCourseSubject.next(undefined);
            this.router.navigate(['/c']).then(() => {
              this.toastService.showToast(
                'Course with that ID was not found.',
                ToastType.Error,
              );
            });
          }
        });
    }
  }
}
