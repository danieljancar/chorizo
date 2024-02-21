import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Course } from '../../../../projects/types/src/lib/course.types';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CourseStateService {
  private currentCourseSubject = new ReplaySubject<Course | undefined>(1);
  currentCourse$: Observable<Course | undefined> =
    this.currentCourseSubject.asObservable();
  private lastCourseId: string | null = null;

  constructor(private afs: AngularFirestore) {}

  setCurrentCourse(courseId: string): void {
    if (this.lastCourseId !== courseId) {
      this.lastCourseId = courseId;
      this.currentCourseSubject.next(undefined);
      this.afs
        .doc<Course>(`courses/${courseId}`)
        .valueChanges({ idField: 'id' })
        .subscribe((course) => {
          if (course) {
            this.currentCourseSubject.next(course);
          }
        });
    } else {
    }
  }
}
