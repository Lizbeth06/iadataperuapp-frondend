import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-modalsoportetecnico',
  standalone: true,
  imports: [CommonModule,MaterialModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,RouterLink],
  templateUrl: './modalsoportetecnico.component.html',
  styleUrl: './modalsoportetecnico.component.css'
})
export class ModalsoportetecnicoComponent {
  redirigirAWhatsAppST(): void {
    let telefono = '51930794100';
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, estoy interesado en recibir información sobre el servicio de *Soporte Técnico a domicilio* que ofrecen`;
    window.open(enlaceWhatsApp, '_blank');
  }

  realizarLlamada() {
    // Número de teléfono al que deseas llamar
    const numeroTelefono = '+51930794100';

    // Utiliza la API de navegación para realizar la llamada
    window.open(`tel:${numeroTelefono}`, '_self');
  }

}
