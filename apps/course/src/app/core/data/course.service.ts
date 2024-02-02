import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Course } from '../../../../projects/types/src/lib/course.types';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private afs: AngularFirestore) {}

  getCourses(
    searchTerm: string = '',
    sortBy: string = 'createdAt',
  ): Observable<Course[]> {
    return this.afs
      .collection<Course>('courses', (ref) => {
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

        return query;
      })
      .valueChanges({ idField: 'id' });
  }
}
