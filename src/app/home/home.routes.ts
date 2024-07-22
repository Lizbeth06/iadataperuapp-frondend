import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { ConsultoriaComponent } from './consultoria/consultoria.component';
import { ServicioTecnicoComponent } from './servicio-tecnico/servicio-tecnico.component';
import { VentaAccesoriosComponent } from './venta-accesorios/venta-accesorios.component';
import { VentaSistemasComponent } from './venta-sistemas/venta-sistemas.component';
import { CursoComponent } from './curso/curso.component';
import { TallerComponent } from './taller/taller.component';
import { MicertificadoComponent } from './micertificado/micertificado.component';
import { DetalleTallerComponent } from './taller/detalle-taller/detalle-taller.component';

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
