import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '', // raíz de /admin
    loadComponent: () => import('./home-admin/home-admin.component').then(c => c.HomeAdminComponent),
    title: 'data'
  },  
  {
    path: 'evaluacion-madurez',
    loadComponent: () => import('./evaluacionmadurez/evaluacionmadurez.component').then(c => c.EvaluacionmadurezComponent),
    title: 'evaluacion de madurez de Digital'
  }
];