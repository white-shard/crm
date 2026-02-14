import { Routes } from '@angular/router';
import { AuthPage } from './pages/auth.page/auth.page';
import { LandingPage } from './pages/landing.page/landing.page';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'auth',
    component: AuthPage,
  },
];
