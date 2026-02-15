import { Routes } from '@angular/router';
import { AuthorizedAccessGuard, NotAuthorizedAccessGuard } from './auth/access.guard';
import { AuthPage } from './pages/auth.page/auth.page';
import { DashboardPage } from './pages/dashboard.page/dashboard.page';
import { LandingPage } from './pages/landing.page/landing.page';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'auth',
    component: AuthPage,
    canActivate: [NotAuthorizedAccessGuard],
  },
  {
    path: '',
    canActivate: [AuthorizedAccessGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardPage,
      },
    ],
  },
];
