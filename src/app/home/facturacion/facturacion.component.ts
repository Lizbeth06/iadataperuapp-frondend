import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, LOCALE_ID, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule, DatePipe } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { RouterModule } from '@angular/router';
import { Producto } from '../../model/producto';
import { ProductoService } from '../../services/producto.service';
import { VentasistemasDemoComponent } from '../venta-sistemas/ventasistemas-demo/ventasistemas-demo.component';
import { VentasistemasCotizarComponent } from '../venta-sistemas/ventasistemas-cotizar/ventasistemas-cotizar.component';
import { MatDialog } from '@angular/material/dialog';
import { ListabeneficiosproductoService } from '../../services/listabeneficiosproducto.service';
import { Listabeneficiosproducto } from '../../model/listabeneficiosproducto';

// Registrar los componentes web de Swiper (incluye Coverflow, Pagination, etc.)
register();

@Component({
  selector: 'app-facturacion',
  standalone: true,
  imports: [MaterialModule,CommonModule,RouterModule],
  templateUrl: './facturacion.component.html',
  styleUrl: './facturacion.component.css',
    providers: [
        { provide: LOCALE_ID, useValue: 'es' },  // Establecer la configuración regional
        DatePipe
      ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FacturacionComponent implements OnInit{
  producto:Producto[] = [];
  productolista!:Producto[];
  productoFiltrado: Producto[] = [];
  listabeneficiosPorProducto: { [idCurso: number]: Listabeneficiosproducto[] } = {};
  chips: { label: string; value: number; count: number; selected: boolean }[] = [];

  readonly dialog = inject(MatDialog);

  private datePipe = inject(DatePipe);
  private productoService= inject(ProductoService);
  private listabeneficiosproductoService = inject(ListabeneficiosproductoService);

  ngOnInit(): void {
    this.productoService.findAll().subscribe(data => {
      const productosFiltradosTipo = data
        .filter(producto => producto.tipoproducto?.idTipoproducto === 1)
        .sort((a, b) => b.idProducto - a.idProducto); 

      this.producto = productosFiltradosTipo;
      this.productoFiltrado = productosFiltradosTipo; // Inicialmente igual


      productosFiltradosTipo.forEach(producto => {
        this.listabeneficiosproductoService.findByProductoBeneficiosId(producto.idProducto)
          .subscribe(listabeneficios => {
            const beneficiosFiltrados = listabeneficios.filter(b => b.tipobeneficio === 1);
            this.listabeneficiosPorProducto[producto.idProducto] = beneficiosFiltrados;
          });
      });
    });

    this.productoService.obtenerResumenProductoPorCategoria().subscribe(data => {
      this.chips=data.map(item => ({
        label: item.nombreCategoria,
        value: item.idCategoria,
        count: item.totalPorCategoria,
        selected: false
      }));
    });



  }

  esProductoNuevo(fechaCreacion: string | Date): boolean {
    if (!fechaCreacion) return false;

    const fechaProducto = new Date(fechaCreacion);
    const fechaActual = new Date();

    // Restar 6 meses a la fecha actual
    const fechaLimite = new Date(fechaActual);
    fechaLimite.setMonth(fechaLimite.getMonth() - 6);

    return fechaProducto >= fechaLimite;
  }

  getPlainText(html: string, limit: number): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  openDialogDemo(idProducto: number): void {
      this.dialog.open(VentasistemasDemoComponent, {
        width: '900px',
        backdropClass: '',
        disableClose: false,
        data: { idProducto }
      });
    }
  
    openDialogCotizar(idProducto: number): void {
      this.dialog.open(VentasistemasCotizarComponent, {
        width: '1500px',
        backdropClass: 'custom-backdrop-class',
        disableClose: false,
        data: { idProducto }
      });
    }

  redirigirAWhatsAppPlan1(): void {
    let telefono = '51930794100';
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, ¿podrían proporcionarme información sobre el *Plan Básico* de Facturación Electrónica?`;
    window.open(enlaceWhatsApp, '_blank');
  }

  redirigirAWhatsAppPlan2(): void {
    let telefono = '51930794100';
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, ¿podrían proporcionarme información sobre el *Plan Emprendedor* de Facturación Electrónica?`;
    window.open(enlaceWhatsApp, '_blank');
  }

  redirigirAWhatsAppPlan3(): void {
    let telefono = '51930794100';
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, ¿podrían proporcionarme información sobre el *Plan Empresial* de Facturación Electrónica?`;
    window.open(enlaceWhatsApp, '_blank');
  }

}
