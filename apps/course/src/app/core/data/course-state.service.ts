import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../../../../projects/types/src/lib/course.types';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CourseStateService {
  private currentCourseSubject = new BehaviorSubject<Course | undefined>(
    undefined,
  );
  currentCourse$: Observable<Course | undefined> =
    this.currentCourseSubject.asObservable();

  constructor(private afs: AngularFirestore) {}

  setCurrentCourse(courseId: string): void {
    this.afs
      .doc<Course>(`courses/${courseId}`)
      .valueChanges({ idField: 'id' })
      .subscribe((course) => {
        this.currentCourseSubject.next(course);
      });
  }
}
