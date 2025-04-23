import { Route } from '@angular/router';
import { JwtGuard } from '../guards/jwt.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [JwtGuard], // Apply the guard to the parent route
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../pages/main/main.component').then((m) => m.MainComponent),
      },
      {
        path: 'todo',
        loadComponent: () =>
          import('../pages/todo/todo.component').then((m) => m.TodoComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('../pages/about/about.component').then(
            (m) => m.AboutComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../pages/login/login.component').then((m) => m.LoginComponent),
  },
];
