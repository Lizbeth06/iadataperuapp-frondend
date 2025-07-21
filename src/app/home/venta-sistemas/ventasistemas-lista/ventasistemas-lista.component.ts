import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { VentasistemasDemoComponent } from '../ventasistemas-demo/ventasistemas-demo.component';
import { VentasistemasCotizarComponent } from '../ventasistemas-cotizar/ventasistemas-cotizar.component';
declare var bootstrap: any;

@Component({
  selector: 'app-ventasistemas-lista',
  standalone: true,
  imports: [MaterialModule,CommonModule,RouterLink,MatGridListModule],
  templateUrl: './ventasistemas-lista.component.html',
  styleUrl: './ventasistemas-lista.component.css'
})
export class VentasistemasListaComponent implements AfterViewInit{

  readonly dialog = inject(MatDialog);
    
  chips = [
    { label: 'Público', selected: false, count: 3 },
    { label: 'Privado', selected: false, count: 5 },
    { label: 'Privado', selected: false, count: 5 },
    { label: 'Empresarial', selected: false, count: 0 }
  ];

  onChipClick(item: any, index: number): void {
    item.selected = !item.selected;
    console.log('Chip clickeado:', item.label);
  }

  onChipSelected(){}

  openDialogDemo(): void {
    this.dialog.open(VentasistemasDemoComponent, {
      width: '900px',
      backdropClass: '',
      disableClose: false 
    });
  }

  openDialogCotizar(): void {
    this.dialog.open(VentasistemasCotizarComponent, {
      width: '1200px',
      backdropClass: 'custom-backdrop-class',
      disableClose: false 
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

}
