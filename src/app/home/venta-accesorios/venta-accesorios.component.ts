import { Component, inject, OnInit } from '@angular/core';
import { Producto } from '../../model/producto';
import { ProductoService } from '../../services/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-venta-accesorios',
  standalone: true,
  imports: [MaterialModule,CommonModule,RouterLink],
  templateUrl: './venta-accesorios.component.html',
  styleUrl: './venta-accesorios.component.css'
})
export class VentaAccesoriosComponent implements OnInit{
  producto:Producto[] = [];
 
     productoPaginada: Producto[] = [];
     searchText: string = '';
     productoFiltrado: Producto[] = [];
     chips: { label: string; value: number; count: number; selected: boolean }[] = [];


  redirigirAWhatsAppVA(): void {
    
    // Definir el número de teléfono o enlace de WhatsApp
    let telefono = '51900696971'; // Aquí pon el número de teléfono o enlace de WhatsApp

    // Construir el enlace de WhatsApp
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Estoy interesado en consultar o adquirir un *accesorio*. ¿Podrían proporcionarme más detalles?`;

    // Redirigir al usuario a WhatsApp
    window.open(enlaceWhatsApp, '_blank');
  }

   // valores por defecto
    pageSize = 9;
    pageIndex = 0;
  
  
    readonly dialog = inject(MatDialog);
    private productoService = inject(ProductoService);

  ngOnInit(): void {

    this.productoService.findAll().subscribe(data => {
      const productosFiltradosTipo = data
        .filter(producto => producto.tipoproducto?.idTipoproducto === 2)
        .sort((a, b) => b.idProducto - a.idProducto); 

      this.producto = productosFiltradosTipo;
      this.productoFiltrado = productosFiltradosTipo; // Inicialmente igual
      this.setPaginado();


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

  setPaginado(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.productoPaginada = this.productoFiltrado.slice(start, end);
  }

  clearSearch(): void {
    this.searchText = '';
    this.productoFiltrado = [...this.producto];
    this.setPaginado();
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

  filtrarProductos(): void {
    const texto = this.searchText.toLowerCase().trim();
    // Obtener categoría seleccionada
    const categoriaSeleccionada = this.chips.find(chip => chip.selected);

    this.productoFiltrado = this.producto.filter(p => {
      const cumpleBusqueda = p.titulo?.toLowerCase().includes(texto) ||
        this.getPlainText(p.descripcion || '', 1000).toLowerCase().includes(texto);
      const cumpleCategoria = categoriaSeleccionada ? p.categoria?.idCategoria === categoriaSeleccionada.value : true;
      return cumpleBusqueda && cumpleCategoria;
    });

    this.pageIndex = 0; 
    this.setPaginado();
  }

  getPlainText(html: string, limit: number): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  onPageChange(event: PageEvent): void {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.setPaginado();
      }

}
