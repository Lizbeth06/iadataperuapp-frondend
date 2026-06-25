import { Routes } from '@angular/router';
import { LayoutComponent } from './home/layout/layout.component';

export const routes: Routes = [
    { 
        path: '', 
        component: LayoutComponent,
        loadChildren: () => import('./home/home.routes').then(m=>m.HOME_ROUTES)
    },
    {  
        path: 'data',
        loadChildren: () => import('./admin/admin.routes').then(m=>m.ADMIN_ROUTES)
    },
    {
        path: 'auth',    
        loadChildren: () => import('./auth/auth.routes').then(m=>m.AUTH_ROUTES)
    }
];


