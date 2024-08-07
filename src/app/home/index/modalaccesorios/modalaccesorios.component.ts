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
  selector: 'app-modalaccesorios',
  standalone: true,
  imports: [CommonModule,MaterialModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,RouterLink],
  templateUrl: './modalaccesorios.component.html',
  styleUrl: './modalaccesorios.component.css'
})
export class ModalaccesoriosComponent {
  redirigirAWhatsApp(): void {
    // Definir el número de teléfono o enlace de WhatsApp
    let telefono = '+51930794100'; // Aquí pon el número de teléfono o enlace de WhatsApp

    // Construir el enlace de WhatsApp
    let enlaceWhatsApp = `https://wa.me/${telefono}`;

    // Redirigir al usuario a WhatsApp
    window.open(enlaceWhatsApp, '_blank');
  }

  realizarLlamada() {
    // Número de teléfono al que deseas llamar
    const numeroTelefono = '+51930794100';

    // Utiliza la API de navegación para realizar la llamada
    window.open(`tel:${numeroTelefono}`, '_self');
  }
}
