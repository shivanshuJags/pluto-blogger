import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./layout/homepage/homepage.component').then(m => m.HomepageComponent) },
    { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
];
