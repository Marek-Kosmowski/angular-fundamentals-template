import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  tap,
  catchError,
  throwError,
  finalize,
} from 'rxjs';
import { Course } from '@app/models/course.model';
import { CoursesService } from './courses.service';
import { Author } from '@app/models/author.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);
  private authors$$ = new BehaviorSubject<Author[]>([]);
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  public courses$: Observable<any[]> = this.courses$$.asObservable();
  public authors$: Observable<Author[]> = this.authors$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll() {
    // Add your code here
    this.isLoading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(
        tap((courses) => {
          this.courses$$.next(courses);
          this.isLoading$$.next(false);
        })
      )
      .subscribe();
  }

  createCourse(course: Course) {
    // replace 'any' with the required interface
    // Add your code here
    this.isLoading$$.next(true);
    this.coursesService
      .createCourse(course)
      .pipe(
        tap((newCourse) => {
          const currentCourses = this.courses$$.value;
          this.courses$$.next([...currentCourses, newCourse]);
          this.isLoading$$.next(false);
        })
      )
      .subscribe();
  }

  getCourse(id: string) {
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.getCourse(id).pipe(
      tap(() => this.isLoading$$.next(false)),
      catchError(() => {
        this.isLoading$$.next(false);
        return throwError('Error fetching course');
      })
    );
  }

  editCourse(id: string, course: Course) {
    // replace 'any' with the required interface
    // Add your code here
    return this.coursesService.editCourse(id, course).pipe(
      tap((updatedCourse) => {
        const updatedCourses = this.courses$$.value.map((course) =>
          course.id === id ? updatedCourse : course
        );
        this.courses$$.next(updatedCourses);
      })
    );
  }

  deleteCourse(id: string) {
    // Add your code here
    this.coursesService
      .deleteCourse(id)
      .pipe(
        tap(() => {
          const filteredCourses = this.courses$$.value.filter(
            (course) => course.id !== id
          );
          this.courses$$.next(filteredCourses);
        })
      )
      .subscribe();
  }

  filterCourses(value: string): Observable<Course[]> {
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.filterCourses(value).pipe(
      tap((filterCourse: any) => {
        this.courses$$.next(filterCourse);
        this.isLoading$$.next(false);
      }),
      catchError(() => {
        this.isLoading$$.next(false);
        return throwError('Error filtering courses');
      })
    );
  }

  getAllAuthors() {
    // Add your code here
    this.isLoading$$.next(true);
  }

  createAuthor(name: string) {
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.createAuthor(name).pipe(
      tap(() => this.isLoading$$.next(false)),
      catchError(() => {
        this.isLoading$$.next(false);
        return throwError('Error creating author');
      })
    );
  }

  getAuthorById(id: string) {
    // Add your code here
    return this.coursesService.getAuthorById(id);
  }
}
