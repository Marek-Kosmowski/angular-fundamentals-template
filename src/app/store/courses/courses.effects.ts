import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
  Observable,
  of,
  map,
  catchError,
  tap,
  switchMap,
  withLatestFrom,
  mergeMap,
} from 'rxjs';

import { Course } from '@app/models/course.model';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStateFacade } from './courses.facade';
import * as CoursesActions from './courses.actions';

@Injectable()
export class CoursesEffects {
  // Add your code here
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesStateFacade: CoursesStateFacade,
    private router: Router
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() =>
        this.coursesService.getAll().pipe(
          map((courses) =>
            CoursesActions.requestAllCoursesSuccess({ courses })
          ),
          catchError((error) =>
            of(CoursesActions.requestAllCoursesFail({ error }))
          )
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      switchMap(({ title }) =>
        this.coursesService.getAll().pipe(
          map((courses: Course[]) =>
            courses.filter((course: Course) => course.title?.includes(title))
          ),
          map((filteredCourses: Course[]) =>
            CoursesActions.requestFilteredCoursesSuccess({
              courses: filteredCourses,
            })
          ),
          catchError((error) =>
            of(
              CoursesActions.requestFilteredCoursesFail({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  getSpecificCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      switchMap((action) =>
        this.coursesService.getCourse(action.id).pipe(
          map((course: Course) =>
            CoursesActions.requestSingleCourseSuccess({ course })
          ),
          catchError((error) =>
            of(CoursesActions.requestSingleCourseFail({ error }))
          )
        )
      )
    )
  );

  deleteCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      switchMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(() => CoursesActions.requestAllCourses()),
          catchError((error) =>
            of(CoursesActions.requestDeleteCourseFail({ error }))
          )
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap((action) =>
        this.coursesService.editCourse(action.id, action.course).pipe(
          map((course) => CoursesActions.requestEditCourseSuccess({ course })),
          catchError((error) =>
            of(CoursesActions.requestEditCourseFail({ error }))
          )
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      switchMap((action) =>
        this.coursesService.createCourse(action.course).pipe(
          map((course: Course) =>
            CoursesActions.requestCreateCourseSuccess({ course })
          ),
          catchError((error) =>
            of(CoursesActions.requestCreateCourseFail({ error }))
          )
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoursesActions.requestCreateCourseSuccess,
          CoursesActions.requestEditCourseSuccess,
          CoursesActions.requestSingleCourseFail
        ),
        tap(() => this.router.navigate(['/courses']))
      ),
    { dispatch: false }
  );
}
