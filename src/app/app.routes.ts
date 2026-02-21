import { AuthorizedAccessGuard, NotAuthorizedAccessGuard } from '@/models/auth/access.guard';
import { Routes } from '@angular/router';
import { AuthPage } from './pages/auth.page/auth.page';
import { DashboardPage } from './pages/dashboard.page/dashboard.page';
import { LandingPage } from './pages/landing.page/landing.page';
import { DashboardLayout } from './pages/layout/dashboard.layout/dashboard.layout';

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
    component: DashboardLayout,
    canActivate: [AuthorizedAccessGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardPage,
      },
    ],
  },
];
