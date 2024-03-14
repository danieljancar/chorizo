import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {
  Course,
  CourseChapter,
  CourseDocument,
} from '../../../projects/types/src/lib/course.types';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly COURSES_COLLECTION_COLLECTION = 'courses';
  private readonly COURSE_DOCUMENTATION_COLLECTION = 'documentation';
  private readonly COURSE_DOCUMENTATION_DOCUMENTS_COLLECTION = 'documents';

  constructor(private afs: AngularFirestore) {}

  getCourses(
    searchTerm: string = '',
    sortBy: string = 'createdAt',
  ): Observable<Course[]> {
    return this.afs
      .collection<Course>(this.COURSES_COLLECTION_COLLECTION, (ref) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      .collection(this.COURSES_COLLECTION_COLLECTION, (ref) =>
        ref
          .orderBy('createdAt', 'desc')
          .limit(amount)
          .where('published', '==', true),
      )
      .valueChanges({ idField: 'id' }) as Observable<Course[]>;
  }

  getCourseChapters(courseId: string | undefined): Observable<CourseChapter[]> {
    return this.afs
      .collection(this.COURSES_COLLECTION_COLLECTION)
      .doc(courseId)
      .collection<CourseChapter>('documentation', (ref) =>
        ref.orderBy('order', 'asc'),
      )
      .valueChanges({
        idField: 'id',
      }) as Observable<CourseChapter[]>;
  }

  getCourseChapterDocuments(
    courseId: string | undefined,
    chapterId: string | undefined,
  ): Observable<CourseDocument[]> {
    return this.afs
      .collection(
        `${this.COURSES_COLLECTION_COLLECTION}/${courseId}/${this.COURSE_DOCUMENTATION_COLLECTION}/${chapterId}/${this.COURSE_DOCUMENTATION_DOCUMENTS_COLLECTION}`,
        (ref) => ref.orderBy('order', 'asc'),
      )
      .valueChanges({ idField: 'id' }) as Observable<CourseDocument[]>;
  }
}
