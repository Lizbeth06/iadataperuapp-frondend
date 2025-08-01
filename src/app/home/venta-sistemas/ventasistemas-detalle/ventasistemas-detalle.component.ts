import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VentasistemasCotizarComponent } from '../ventasistemas-cotizar/ventasistemas-cotizar.component';
import { AgendarFormComponent } from '../../agendar/agendar-form/agendar-form.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Producto } from '../../../model/producto';
import { ProductoService } from '../../../services/producto.service';
import { SafeUrlPipe } from '../../../services/safeUrlPipe';
import { Listabeneficiosproducto } from '../../../model/listabeneficiosproducto';
import { ListabeneficiosproductoService } from '../../../services/listabeneficiosproducto.service';
import { ListadetalleproductoService } from '../../../services/listadetalleproducto.service';

@Component({
  selector: 'app-ventasistemas-detalle',
  standalone: true,
  imports: [MaterialModule,CommonModule,RouterLink,SafeUrlPipe],
  templateUrl: './ventasistemas-detalle.component.html',
  styleUrl: './ventasistemas-detalle.component.css'
})
export class VentasistemasDetalleComponent implements OnInit{
  titulo: string;
  producto!:Producto[];
  listabeneficiosPorProducto: { [idCurso: number]: Listabeneficiosproducto[] } = {};
  listabeneficiosPorProducto2: { [idCurso: number]: Listabeneficiosproducto[] } = {};
  
  
  private productoService = inject(ProductoService);
  private listabeneficiosproductoService = inject(ListabeneficiosproductoService);
  private listadetalleproductoService = inject(ListadetalleproductoService);
  

  constructor(
      private route: ActivatedRoute,
      private sanitizer: DomSanitizer
    ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
    this.titulo = this.route.snapshot.paramMap.get('titulo') || '';

    this.productoService.findAllTitulo(this.titulo).subscribe((data) => { 
      this.producto = data;
      const productosFiltradosTipo = data

      productosFiltradosTipo.forEach(producto => {
        this.listabeneficiosproductoService.findByProductoBeneficiosId(producto.idProducto)
          .subscribe(listabeneficios => {
            const beneficiosFiltrados = listabeneficios.filter(b => b.tipobeneficio === 1);
            this.listabeneficiosPorProducto[producto.idProducto] = beneficiosFiltrados;
          });
      });

      productosFiltradosTipo.forEach(producto => {
        this.listabeneficiosproductoService.findByProductoBeneficiosId(producto.idProducto)
          .subscribe(listabeneficios => {
            const beneficiosFiltrados = listabeneficios.filter(b => b.tipobeneficio === 2);
            this.listabeneficiosPorProducto2[producto.idProducto] = beneficiosFiltrados;
          });
      });

    });

    });
  }


  compartirWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${url}`, '_blank');
  }

  compartirFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  compartirLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  }


  readonly dialog = inject(MatDialog);

  openDialogCotizar(idProducto: number): void {
  this.dialog.open(VentasistemasCotizarComponent, {
    width: '1500px',
    backdropClass: 'custom-backdrop-class',
    disableClose: false,
    data: { idProducto }
  });
}

openDialogAgendar(idProducto: number): void {
  this.dialog.open(AgendarFormComponent, {
    width: '1500px',
    backdropClass: '',
    disableClose: false,
    data: { idProducto }
  });
}

}
