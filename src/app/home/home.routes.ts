import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./index/index.component').then(c => c.IndexComponent),
        title: 'principal'
    },
    {
        path: 'nosotros',
        loadComponent: () => import('./nosotros/nosotros.component').then((c) => c.NosotrosComponent),
        title: 'nosotros',
    },
    {
        path: 'catalogo',
        loadComponent: () => import('./catalogo/catalogo.component').then((c) => c.CatalogoComponent),
        title: 'catalogo',
    },
    {
        path: 'consultoria',
        loadComponent: () => import('./consultoria/consultoria.component').then((c) => c.ConsultoriaComponent),
        title: 'consultoria',
    },
    {
        path: 'servicio-tecnico',
        loadComponent: () => import('./servicio-tecnico/servicio-tecnico.component').then((c) => c.ServicioTecnicoComponent),
        title: 'servicio tecnico',
    },
    {
        path: 'venta-accesorios',
        loadComponent: () => import('./venta-accesorios/venta-accesorios.component').then((c) => c.VentaAccesoriosComponent),
        title: 'venta de accesorios',
    },
    {
        path: 'venta-sistemas',
        loadComponent: () => import('./venta-sistemas/ventasistemas-lista/ventasistemas-lista.component').then((c) => c.VentasistemasListaComponent),
        title: 'venta de sistemas',
    },
    {
        path: 'venta-sistemas/detalle/:titulo',
        loadComponent: () => import('./venta-sistemas/ventasistemas-detalle/ventasistemas-detalle.component').then((c) => c.VentasistemasDetalleComponent),
        title: 'Detalle de venta de sistemas',
    },
    {
        path: 'curso',
        loadComponent: () => import('./curso/curso-lista/curso-lista.component').then((c) => c.CursoListaComponent),
        title: 'Cursos',
    },
    {
        path: 'curso/detalle/:titulo',
        loadComponent: () => import('./curso/curso-detalle/curso-detalle.component').then((c) => c.CursoDetalleComponent),
        title: 'Detalle del curso',
    },
    {
        path: 'curso/detalle-pago/checkout',
        loadComponent: () => import('./checkout/checkout-form/checkout-form.component').then((c) => c.CheckoutFormComponent),
        title: 'Checkout curso',
    },
    {
        path: 'producto/detalle-pago/checkout-producto',
        loadComponent: () => import('./servicio-tecnico/checkout-producto/checkout-producto.component').then((c) => c.CheckoutProductoComponent),
        title: 'Checkout producto',
    },
    {
        path: 'taller',
        loadComponent: () => import('./curso/taller-lista/taller-lista.component').then((c) => c.TallerListaComponent),
        title: 'Taller',
    },
    {
        path: 'micertificado',
        loadComponent: () => import('./micertificado/micertificado.component').then((c) => c.MicertificadoComponent),
        title: 'Mi certificado',
    },
    {
        path: 'facturacion-electronica',
        loadComponent: () => import('./facturacion/facturacion.component').then((c) => c.FacturacionComponent),
        title: 'facturacion electronica',
    },
    {
        path: 'profesionales',
        loadComponent: () => import('./profesionales/profesional-lista/profesional-lista.component').then((c) => c.ProfesionalListaComponent),
        title: 'profesionales',
    },
    {
        path: 'contacto',
        loadComponent: () => import('./contacto/contacto.component').then((c) => c.ContactoComponent),
        title: 'contacto',
    },
    {
        path: 'iantropia',
        loadComponent: () => import('./iantropia/iantropia.component').then((c) => c.IantropiaComponent),
        title: 'IAntropia',
    },
    {
        path: 'convocatoria',
        loadComponent: () => import('./convocatoria/convocatoria-lista/convocatoria-lista.component').then((c) => c.ConvocatoriaListaComponent),
        title: 'Convocatoria',
    },
];