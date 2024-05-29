import { Routes } from '@angular/router';
import { LayoutComponent } from './publico/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        loadChildren: () => import('./publico/publico.routes').then(m=>m.PUBLICO_ROUTES)
    }
];
