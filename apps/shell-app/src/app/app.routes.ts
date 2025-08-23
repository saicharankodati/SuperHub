import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { App } from './app';

export const routes: Routes = [
    {
        path: '',
        component: App
    },
    {
        path: 'auth',
        loadComponent: () => loadRemoteModule('auth-app', './Component').then((m) => m.App)
    },
    {
        path: 'dashboard',
        loadComponent: () => loadRemoteModule('dashboard-app', './Component').then((m) => m.App)
    },
    {
        path: '**',
        component: App
    }
];
