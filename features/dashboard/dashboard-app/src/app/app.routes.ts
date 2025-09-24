import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./components/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
    },
    {
        path: '**',
        loadChildren: () => import('./components/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
    }
];
