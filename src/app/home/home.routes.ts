import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
    {
        path: '',
        pathMatch:'full',
        loadComponent: () => import('./index/index.component').then((m)=>m.IndexComponent),
    },
    {
        path: 'nosotros',
        pathMatch:'full',
        loadComponent: () => import('./nosotros/nosotros.component').then((m)=>m.NosotrosComponent),
    },
    {
        path: 'catalogo', 
        pathMatch:'full',
        loadComponent: () => import('./catalogo/catalogo.component').then((m)=>m.CatalogoComponent),
    },
    {
        path: 'consultoria',
        pathMatch:'full',
        loadComponent: () => import('./consultoria/consultoria.component').then((m)=>m.ConsultoriaComponent),
    },
    {
        path: 'servicio-tecnico',
        pathMatch:'full',
        loadComponent: () => import('./servicio-tecnico/servicio-tecnico.component').then((m)=>m.ServicioTecnicoComponent),
    },
    {
        path: 'venta-accesorios',
        pathMatch:'full',
        loadComponent: () => import('./venta-accesorios/venta-accesorios.component').then((m)=>m.VentaAccesoriosComponent),
    },
    {
        path: 'venta-sistemas',
        pathMatch:'full',
        loadComponent: () => import('./venta-sistemas/venta-sistemas.component').then((m)=>m.VentaSistemasComponent),
    },
    {
        path: 'curso',
        pathMatch:'full',
        loadComponent: () => import('./curso/curso.component').then((m)=>m.CursoComponent),
    },
    {
        path: 'taller',
        pathMatch:'full',
        loadComponent: () => import('./taller/taller.component').then((m)=>m.TallerComponent),
    },
    {
        path: 'micertificado',
        pathMatch:'full',
        loadComponent: () => import('./micertificado/micertificado.component').then((m)=>m.MicertificadoComponent),
    },
    {
        path: 'detalle-taller',
        pathMatch:'full',
        loadComponent: () => import('./taller/detalle-taller/detalle-taller.component').then((m)=>m.DetalleTallerComponent),
    }
];
