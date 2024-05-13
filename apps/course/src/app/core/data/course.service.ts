import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, Observable } from 'rxjs';
import { Course } from '../../../../projects/types/src/lib/course/course.types';
import {
  CourseChapter,
  CourseDocument,
} from '../../../../projects/types/src/lib/course/course-documentation.types';
import { CourseResource } from '../../../../projects/types/src/lib/course/course-resources.types';
import {
  CourseTask,
  CourseTasksDone,
} from '../../../../projects/types/src/lib/course/course-tasks.types';
import { map, switchMap } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly COURSES_COLLECTION_COLLECTION = 'courses';
  private readonly COURSE_DOCUMENTATION_COLLECTION = 'documentation';
  private readonly COURSE_DOCUMENTATION_DOCUMENTS_COLLECTION = 'documents';
  private readonly COURSE_TASKS_COLLECTION = 'tasks';
  private readonly COURSE_TASKS_DONE_COLLECTION = 'done';
  private readonly COURSE_RESOURCES_COLLECTION = 'resources';

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

  getCourseTasks(
    courseId: string | undefined,
    userId: string,
  ): Observable<CourseTask[]> {
    return this.afs
      .collection<CourseTask>(
        `${this.COURSES_COLLECTION_COLLECTION}/${courseId}/${this.COURSE_TASKS_COLLECTION}`,
        (ref) => ref.orderBy('order', 'asc'),
      )
      .valueChanges({ idField: 'id' })
      .pipe(
        switchMap((tasks) => {
          const tasksWithStatus$ = tasks.map((task) => {
            return this.afs
              .doc<CourseTasksDone>(
                `${this.COURSES_COLLECTION_COLLECTION}/${courseId}/${this.COURSE_TASKS_COLLECTION}/${task.id}/${this.COURSE_TASKS_DONE_COLLECTION}/${userId}`,
              )
              .valueChanges()
              .pipe(
                map((status) => {
                  task.done = status;
                  return task;
                }),
              );
          });
          return combineLatest(tasksWithStatus$);
        }),
      );
  }

  markTaskAsCompleted(courseId: string, taskId: string, userId: string): void {
    const taskDoneRef = this.afs.doc<CourseTasksDone>(
      `${this.COURSES_COLLECTION_COLLECTION}/${courseId}/${this.COURSE_TASKS_COLLECTION}/${taskId}/${this.COURSE_TASKS_DONE_COLLECTION}/${userId}`,
    );

    const currentTime = Timestamp.now();

    const updateData = {
      status: true,
      updatedAt: currentTime,
    };

    taskDoneRef
      .update(updateData)
      .then(() => {})
      .catch((error) => {
        if (error.code === 'not-found') {
          taskDoneRef.set({
            status: true,
            updatedAt: currentTime,
            createdAt: currentTime,
          });
        }
      });
  }

  reverseTaskStatus(
    courseId: string,
    taskId: string,
    userId: string,
    status: boolean,
  ): void {
    const taskDoneRef = this.afs.doc<CourseTasksDone>(
      `${this.COURSES_COLLECTION_COLLECTION}/${courseId}/${this.COURSE_TASKS_COLLECTION}/${taskId}/${this.COURSE_TASKS_DONE_COLLECTION}/${userId}`,
    );

    const currentTime = Timestamp.now();

    const updateData = {
      status: !status,
      updatedAt: currentTime,
    };

    taskDoneRef.update(updateData);
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

  getCourseResources(
    courseId: string | undefined,
  ): Observable<CourseResource[]> {
    return this.afs
      .collection(
        `${this.COURSES_COLLECTION_COLLECTION}/${courseId}/${this.COURSE_RESOURCES_COLLECTION}`,
        (ref) => ref.orderBy('createdAt', 'asc'),
      )
      .valueChanges({ idField: 'id' }) as Observable<CourseResource[]>;
  }
}
