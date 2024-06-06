import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { VentaSistemaComponent } from './venta-sistema/venta-sistema.component';
import { ConsultoriaDesarrolloComponent } from './consultoria-desarrollo/consultoria-desarrollo.component';
import { ServicioTecnicoComponent } from './servicio-tecnico/servicio-tecnico.component';

export const PUBLICO_ROUTES: Routes = [
    {
        path:'',
        component: PrincipalComponent
    },
    {
        path:'nosotros',
        component: NosotrosComponent
    },
    {
        path:'venta-sistema',
        component: VentaSistemaComponent
    },
    {
        path:'consultoria-desarrollo',
        component: ConsultoriaDesarrolloComponent
    },
    {
        path:'servicio-tecnico',
        component: ServicioTecnicoComponent
    }
];
