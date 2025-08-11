import { Routes } from '@angular/router';
import { CursoListaComponent } from './curso/curso-lista/curso-lista.component';
import { IndexComponent } from './index/index.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { ConsultoriaComponent } from './consultoria/consultoria.component';
import { ServicioTecnicoComponent } from './servicio-tecnico/servicio-tecnico.component';
import { VentaAccesoriosComponent } from './venta-accesorios/venta-accesorios.component';
import { MicertificadoComponent } from './micertificado/micertificado.component';
import { CursoDetalleComponent } from './curso/curso-detalle/curso-detalle.component';
import { CheckoutFormComponent } from './checkout/checkout-form/checkout-form.component';
import { TallerListaComponent } from './curso/taller-lista/taller-lista.component';
import { VentasistemasListaComponent } from './venta-sistemas/ventasistemas-lista/ventasistemas-lista.component';
import { VentasistemasDetalleComponent } from './venta-sistemas/ventasistemas-detalle/ventasistemas-detalle.component';
import { CheckoutProductoComponent } from './servicio-tecnico/checkout-producto/checkout-producto.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { ProfesionalListaComponent } from './profesionales/profesional-lista/profesional-lista.component';
import { ContactoComponent } from './contacto/contacto.component';
import { IantropiaComponent } from './iantropia/iantropia.component';
import { ConvocatoriaListaComponent } from './convocatoria/convocatoria-lista/convocatoria-lista.component';

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
            component: VentasistemasListaComponent
        },
        {
            path:'venta-sistemas/detalle/:titulo',
            component: VentasistemasDetalleComponent
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
            path:'curso/detalle-pago/checkout',
            component: CheckoutFormComponent
        },
        {
            path:'producto/detalle-pago/checkout-producto',
            component: CheckoutProductoComponent
        },
        {
            path: 'taller',
            component: TallerListaComponent
        },
        {
            path: 'micertificado',
            component: MicertificadoComponent
        },
        {
            path: 'facturacion-electronica',
            component: FacturacionComponent
        },
        {
            path: 'profesionales',
            component: ProfesionalListaComponent
        },
        {
            path: 'contacto',
            component: ContactoComponent
        },
        {
            path: 'iantropia',
            component: IantropiaComponent
        },
        {
            path: 'convocatoria',
            component: ConvocatoriaListaComponent
        }
    ]
  }
];
