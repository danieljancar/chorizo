import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Course } from '../../../projects/types/src/lib/course/course.types';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastService } from './feedback/toast.service';
import { ToastType } from '../types/feedback/toast.types';

/**
 * Provides functionality for managing and tracking the state of the current and last visited courses within an Angular application.
 * It enables components to access, observe, and respond to changes in the course state. This service is crucial for components
 * that need to display or operate based on the current course's information. It interacts with AngularFirestore to fetch course
 * details and ensures that components have up-to-date information about the course being viewed or interacted with.
 *
 * Properties:
 * - `currentCourseId`: ID of the current course being viewed. Undefined if no course is selected.
 * - `currentCourse$`: Observable that components can subscribe to for receiving updates on the current course.
 * - `private currentCourseSubject`: A ReplaySubject that maintains the latest state of the current course for emitting to subscribers.
 * - `private lastCourseId`: Stores the ID of the last course that was visited for comparison and potential rollback scenarios.
 *
 * Methods:
 * - `setCurrentCourse(courseId: string)`: Updates the current course's state based on the specified courseId. Fetches course details from Firestore.
 */
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
