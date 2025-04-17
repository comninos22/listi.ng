import { Route } from '@angular/router';
import { MainComponent } from '../pages/main/main.component';
import { AboutComponent } from '../pages/about/about.component';
import { ProfileComponent } from '../pages/profile/profile.component';

export const appRoutes: Route[] = [
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
    path: 'about',
    //component: AboutComponent,
    loadComponent: () =>
      import('../pages/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
  {
    path: 'profile',
    //component: ProfileComponent,

    loadComponent: () =>
      import('../pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
];
