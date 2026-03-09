import { AuthorizedAccessGuard, NotAuthorizedAccessGuard } from '@/models/auth/access.guard';
import { Routes } from '@angular/router';
import {
  LegalEntityExistsGuard,
  LegalEntityNotExistsGuard,
} from './models/legal-entity/exists.guard';
import { AuthPage } from './pages/auth.page/auth.page';
import { CreateLegalEntityPage } from './pages/create-le.page/create-le.page';
import { DashboardPage } from './pages/dashboard.page/dashboard.page';
import { LandingPage } from './pages/landing.page/landing.page';
import { AuthLayout } from './pages/layout/auth.layout/auth.layout';
import { DashboardLayout } from './pages/layout/dashboard.layout/dashboard.layout';
import { SalesFunnelPage } from './pages/sales-funnel.page/sales-funnel.page';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'auth',
        component: AuthPage,
        canActivate: [NotAuthorizedAccessGuard],
      },
      {
        path: 'create',
        component: CreateLegalEntityPage,
        canActivate: [AuthorizedAccessGuard, LegalEntityNotExistsGuard],
      },
    ],
  },
  {
    path: '',
    component: DashboardLayout,
    canActivate: [AuthorizedAccessGuard, LegalEntityExistsGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardPage,
      },
      {
        path: 'funnel',
        component: SalesFunnelPage,
      },
    ],
  },
];
