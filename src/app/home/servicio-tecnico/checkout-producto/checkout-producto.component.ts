import { Component, inject, LOCALE_ID, OnInit, signal } from '@angular/core';
import { Curso } from '../../../model/curso';
import { CursoService } from '../../../services/curso.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { TrabajadorService } from '../../../services/trabajador.service';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../model/producto';

@Component({
  selector: 'app-checkout-producto',
  standalone: true,
  imports: [MaterialModule,RouterModule,CommonModule],
  templateUrl: './checkout-producto.component.html',
  styleUrl: './checkout-producto.component.css',
  providers: [
        { provide: LOCALE_ID, useValue: 'es' },  // Establecer la configuración regional
        DatePipe
      ]
})
export class CheckoutProductoComponent implements OnInit {
  readonly panelOpenState = signal(false);
   idProducto: number | undefined;
   productolista!: Producto;

   private productoService= inject(ProductoService);

  ngOnInit(): void {
    const state = history.state;
    this.idProducto = state?.idProducto;

    if (!this.idProducto){
      console.warn('No se recibió ID del curso');
    } else {

      this.productoService.findById(this.idProducto).subscribe((datas)=>{
        this.productolista=datas;
      })

    }
  }


  redirigirAWhatsApp(): void {
    const telefono = '51918496515';
    const nombreCurso = this.productolista?.titulo || 'el curso';
    const mensaje = encodeURIComponent(
      `Hola, quiero más información y voy enviar mis requisitos del curso "${nombreCurso}"`
    );

    const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=${mensaje}`;
    window.open(enlaceWhatsApp, '_blank');
  }

}