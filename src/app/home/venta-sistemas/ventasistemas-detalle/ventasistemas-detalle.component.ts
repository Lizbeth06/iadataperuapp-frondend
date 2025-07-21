import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VentasistemasCotizarComponent } from '../ventasistemas-cotizar/ventasistemas-cotizar.component';
import { AgendarFormComponent } from '../../agendar/agendar-form/agendar-form.component';

@Component({
  selector: 'app-ventasistemas-detalle',
  standalone: true,
  imports: [MaterialModule,CommonModule,RouterLink],
  templateUrl: './ventasistemas-detalle.component.html',
  styleUrl: './ventasistemas-detalle.component.css'
})
export class VentasistemasDetalleComponent {

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

  openDialogCotizar(): void {
  this.dialog.open(VentasistemasCotizarComponent, {
    width: '1200px',
    backdropClass: 'custom-backdrop-class',
    disableClose: false 
  });
}

openDialogAgendar(): void {
  this.dialog.open(AgendarFormComponent, {
    width: '1200px',
    backdropClass: '',
    disableClose: false 
  });
}

}
