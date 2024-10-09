import { Course } from '@app/models/course.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';

// Add your code here
export const coursesFeatureKey = 'courses';

export interface CoursesState {
  allCourses: Course[];
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: '',
};

export const coursesReducer = createReducer(
  initialState,

  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: 'null',
  })),

  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: 'null',
  })),

  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestSingleCourse, (state, { id }) => ({
    ...state,
    isSingleCourseLoading: true,
    selectedCourseId: id,
    errorMessage: '',
  })),

  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course: course,
    isSingleCourseLoading: false,
    errorMessage: '',
  })),

  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestFilteredCourses, (state, { title }) => ({
    ...state,
    isSearchState: true,
    searchTitle: title,
    errorMessage: '',
  })),

  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    filteredCourses: courses,
    isSearchState: false,
    errorMessage: '',
  })),

  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isSearchState: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestDeleteCourse, (state, { id }) => ({
    ...state,
    selectedCourseId: id,
    isDeleting: true,
    errorMessage: '',
  })),

  on(
    CoursesActions.requestDeleteCourseSuccess,
    (state, { id }): CoursesState => ({
      ...state,
      allCourses: state.allCourses.filter((course) => course.id !== id),
      isAllCoursesLoading: false,
      errorMessage: '',
    })
  ),

  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    isDeleting: false,
    errorMessage: error,
  })),

  on(
    CoursesActions.requestEditCourse,
    (state): CoursesState => ({
      ...state,
      isSingleCourseLoading: true,
      errorMessage: '',
    })
  ),

  on(
    CoursesActions.requestEditCourseSuccess,
    (state, { course }): CoursesState => ({
      ...state,
      isSingleCourseLoading: false,
      allCourses: state.allCourses
        ? state.allCourses.map((c) => (c.id === course.id ? course : c))
        : [course],
      errorMessage: '',
    })
  ),

  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestCreateCourse, (state, { course }) => ({
    ...state,
    course: course,
    isCreating: true,
    errorMessage: '',
  })),

  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: state.allCourses ? [...state.allCourses, course] : [course],
    isCreating: false,
    errorMessage: '',
  })),

  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    isCrating: false,
    errorMessage: error,
  }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState =>
  coursesReducer(state, action);
