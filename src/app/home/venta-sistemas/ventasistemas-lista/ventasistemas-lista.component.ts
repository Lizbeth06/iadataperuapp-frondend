import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { VentasistemasDemoComponent } from '../ventasistemas-demo/ventasistemas-demo.component';
import { VentasistemasCotizarComponent } from '../ventasistemas-cotizar/ventasistemas-cotizar.component';
import { Producto } from '../../../model/producto';
import { ProductoService } from '../../../services/producto.service';
import { Listabeneficiosproducto } from '../../../model/listabeneficiosproducto';
import { ListadetalleproductoService } from '../../../services/listadetalleproducto.service';
import { ListabeneficiosproductoService } from '../../../services/listabeneficiosproducto.service';
import { Listadetalleproducto } from '../../../model/listadetalleproducto';
import { PageEvent } from '@angular/material/paginator';
import { ProductoCategoriaResumen } from '../../../model/productocategoriaresumen';
declare var bootstrap: any;

@Component({
  selector: 'app-ventasistemas-lista',
  standalone: true,
  imports: [MaterialModule,CommonModule,RouterLink,MatGridListModule],
  templateUrl: './ventasistemas-lista.component.html',
  styleUrl: './ventasistemas-lista.component.css'
})
export class VentasistemasListaComponent implements OnInit, AfterViewInit{
   producto:Producto[] = [];
   listabeneficiosproducto: Listabeneficiosproducto[] = [];
   listadetalleproducto: Listadetalleproducto[] = [];
   productoPaginada: Producto[] = [];
   searchText: string = '';
   productoFiltrado: Producto[] = [];
   resumenPorCategoria: ProductoCategoriaResumen[] = [];
   chips: { label: string; value: number; count: number; selected: boolean }[] = [];


   listabeneficiosPorProducto: { [idCurso: number]: Listabeneficiosproducto[] } = {};

   // valores por defecto
  pageSize = 6;
  pageIndex = 0;


  readonly dialog = inject(MatDialog);
  private productoService = inject(ProductoService);
  private tipoproductoService = inject(ProductoService);
  private listabeneficiosproductoService = inject(ListabeneficiosproductoService);
  private listadetalleproductoService = inject(ListadetalleproductoService);

  ngOnInit(): void {
    this.productoService.findAll().subscribe(data => {
      const productosFiltradosTipo = data
        .filter(producto => producto.tipoproducto?.idTipoproducto === 1)
        .sort((a, b) => b.idProducto - a.idProducto); 

      this.producto = productosFiltradosTipo;
      this.productoFiltrado = productosFiltradosTipo; // Inicialmente igual
      this.setPaginado();

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


    
  

  onChipClick(item: any): void {
    item.selected = !item.selected;
    const chipsSeleccionados = this.chips.filter(chip => chip.selected);

    if (chipsSeleccionados.length === 0) {
      this.productoFiltrado = [...this.producto];
    } else {
      const categoriasSeleccionadas = chipsSeleccionados.map(chip => chip.value);
      this.productoFiltrado = this.producto.filter(p => categoriasSeleccionadas.includes(p.categoria?.idCategoria));
    }

    // Reiniciar paginación
    this.pageIndex = 0;
    this.setPaginado();
  }



  onChipSelected(){}

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


  //carusel
    ngAfterViewInit() {
      const carouselElement = document.querySelector('#carouselFotos');
      if (carouselElement) {
        new bootstrap.Carousel(carouselElement, {
          interval: 3000,
          ride: 'carousel'
        });
      }
    }

  setPaginado(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.productoPaginada = this.productoFiltrado.slice(start, end);
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




}
