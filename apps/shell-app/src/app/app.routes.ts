import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./components/website/website.routes').then(m => m.websiteRoutes)
    },
    {
        path: 'auth',
        loadComponent: () => loadRemoteModule('auth-app', './Component').then((m) => m.App),
        children: [
            {
                path: '',
                loadComponent: () => loadRemoteModule('auth-app', './SignInComponent').then((m) => m.SignIn)
            },
            {
                path: 'sign-in',
                loadComponent: () => loadRemoteModule('auth-app', './SignInComponent').then((m) => m.SignIn)
            },
            {
                path: 'sign-up',
                loadComponent: () => loadRemoteModule('auth-app', './SignUpComponent').then((m) => m.SignUp)
            },
            {
                path: '**',
                loadComponent: () => loadRemoteModule('auth-app', './SignInComponent').then((m) => m.SignIn)
            }
        ]
    },    
    {
        path: 'dashboard',
        loadComponent: () => loadRemoteModule('dashboard-app', './Component').then((m) => m.App)
    },
    {
        path: '**',
        loadChildren: () => import('./components/website/website.routes').then(m => m.websiteRoutes)
    }
];
