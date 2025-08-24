import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./components/sign-in/sign-in.routes').then(m => m.signInRoutes)
    },
    {
        path: 'sign-in',
        loadChildren: () => import('./components/sign-in/sign-in.routes').then(m => m.signInRoutes)
    },
    {
        path: 'sign-up',
        loadChildren: () => import('./components/sign-up/sign-up.routes').then(m => m.signUpRoutes)
    },
    {
        path: '**',
        loadChildren: () => import('./components/sign-in/sign-in.routes').then(m => m.signInRoutes)
    }
];
