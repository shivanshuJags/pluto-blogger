import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./layout/homepage/homepage.component').then(m => m.HomepageComponent) },
    { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
    { path: 'bloglist', loadComponent: () => import('./blogs/home-layout/home-layout.component').then(m => m.HomeLayoutComponent) },
    { path: 'createpost', loadComponent: () => import('./blogs/create-blog/create-blog.component').then(m => m.CreateBlogComponent), canActivate: [AuthGuard] },
    { path: 'my-profile', loadComponent: () => import('./layout/profile-homepage/profile-homepage.component').then(m => m.ProfileHomepageComponent), canActivate: [AuthGuard] },
    { path: 'post/:slug', loadComponent: () => import('./blogs/blog-display/blog-display.component').then(m => m.BlogDisplayComponent) },
];
