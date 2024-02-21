import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Course } from '../../../../projects/types/src/lib/course.types';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private COURSES_COLLECTION = 'courses';

  constructor(private afs: AngularFirestore) {}

  getCourses(
    searchTerm: string = '',
    sortBy: string = 'createdAt',
  ): Observable<Course[]> {
    return this.afs
      .collection<Course>(this.COURSES_COLLECTION, (ref) => {
        let query = ref as any;

        if (searchTerm) {
          query = query
            .where('title', '>=', searchTerm)
            .where('title', '<=', searchTerm + '\uf8ff')
            .orderBy('title')
            .limit(10);
        }

        if (!searchTerm) {
          if (sortBy === 'oldest') {
            query = query.orderBy('createdAt', 'asc');
          } else {
            query = query.orderBy('createdAt', 'desc');
          }
        }

        query = query.where('published', '==', true);

        return query;
      })
      .valueChanges({ idField: 'id' });
  }

  getLatestCourses(amount: number): Observable<Course[]> {
    return this.afs
      .collection(this.COURSES_COLLECTION, (ref) =>
        ref
          .orderBy('createdAt', 'desc')
          .limit(amount)
          .where('published', '==', true),
      )
      .valueChanges({ idField: 'id' }) as Observable<Course[]>;
  }
}
