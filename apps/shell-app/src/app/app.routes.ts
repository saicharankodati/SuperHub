import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Website } from './components/website/website';

export const routes: Routes = [
    {
        path: '',
        component: Website
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
                path: 'signin',
                loadComponent: () => loadRemoteModule('auth-app', './SignInComponent').then((m) => m.SignIn)
            },
            {
                path: 'signup',
                loadComponent: () => loadRemoteModule('auth-app', './SignUpComponent').then((m) => m.SignUp)
            }
        ]
    },    
    {
        path: 'dashboard',
        loadComponent: () => loadRemoteModule('dashboard-app', './Component').then((m) => m.App)
    },
    {
        path: '**',
        component: Website
    }
];
