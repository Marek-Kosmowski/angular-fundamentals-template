import { Routes, CanLoad } from '@angular/router';
import { CourseFormComponent } from './shared/components';
import { CourseInfoComponent } from './features/course-info/course-info.component';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
export const routes: Routes = [
  /* Add your code here */
  {
    path: 'login',
    loadChildren: () =>
      import('./shared/components/login-form/login-form.component').then(
        (m) => m.LoginFormComponent
      ),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'registration',
    loadChildren: () =>
      import(
        './shared/components/registration-form/registration-form.component'
      ).then((m) => m.RegistrationFormComponent),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses/courses.component').then(
        (m) => m.CoursesComponent
      ),
    canLoad: [AuthorizedGuard],
    canActivate: [AuthorizedGuard],
    children: [
      {
        path: 'add',
        component: CourseFormComponent,
        canLoad: [AuthorizedGuard],
        canActivate: [AuthorizedGuard],
      },
      {
        path: ':id',
        component: CourseInfoComponent,
        canLoad: [AuthorizedGuard],
        canActivate: [AuthorizedGuard],
      },
      {
        path: 'edit/:id',
        component: CourseFormComponent,
        canLoad: [AuthorizedGuard],
        canActivate: [AuthorizedGuard],
      },
    ],
  },
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full',
  },
  //404 page
  {
    path: '**',
    redirectTo: '/courses',
  },
];

// const routes: Routes = [
//   {
//     path: 'my-account',
//     loadChildren: () =>
//       import('app/my-account/my-account.module').then((m) => m.MyAccountModule),
//   },
// ];
