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

export const HOME_ROUTES: Routes = [
    {
        path: '',
        component: IndexComponent
    },
    {
        path: 'nosotros',
        component: NosotrosComponent
    },
    {
        path: 'catalogo',
        component: CatalogoComponent
    },
    {
        path: 'consultoria',
        component: ConsultoriaComponent
    },
    {
        path: 'servicio-tecnico',
        component: ServicioTecnicoComponent
    },
    {
        path: 'venta-accesorios',
        component: VentaAccesoriosComponent
    },
    {
        path: 'venta-sistemas',
        component: VentaSistemasComponent
    },
    {
        path: 'curso',
        component: CursoComponent
    },
    {
        path: 'taller',
        component: TallerComponent
    },
    {
        path: 'micertificado',
        component: MicertificadoComponent
    }
];
