import { Routes } from '@angular/router';
import { CursoListaComponent } from './curso/curso-lista/curso-lista.component';
import { IndexComponent } from './index/index.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { ConsultoriaComponent } from './consultoria/consultoria.component';
import { ServicioTecnicoComponent } from './servicio-tecnico/servicio-tecnico.component';
import { VentaAccesoriosComponent } from './venta-accesorios/venta-accesorios.component';
import { VentaSistemasComponent } from './venta-sistemas/venta-sistemas.component';
import { TallerComponent } from './taller/taller.component';
import { MicertificadoComponent } from './micertificado/micertificado.component';
import { CursoDetalleComponent } from './curso/curso-detalle/curso-detalle.component';

export const HOME_ROUTES: Routes = [
    {
    path: '',
    children:[
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
            component: CursoListaComponent
        },
        {
            path:'curso/detalle/:titulo',
            component: CursoDetalleComponent
        },
        {
            path: 'taller',
            component: TallerComponent
        },
        {
            path: 'micertificado',
            component: MicertificadoComponent
        }
    ]
  }
];
