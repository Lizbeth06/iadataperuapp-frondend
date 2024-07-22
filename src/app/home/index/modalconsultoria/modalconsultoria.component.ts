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
  selector: 'app-modalconsultoria',
  standalone: true,
  imports: [CommonModule,MaterialModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,RouterLink],
  templateUrl: './modalconsultoria.component.html',
  styleUrl: './modalconsultoria.component.css'
})
export class ModalconsultoriaComponent {
  redirigirAWhatsAppConsultarCS(): void {
    let telefono = '51930794100'; // Aquí pon el número de teléfono o enlace de WhatsApp
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, estoy interesado en recibir detalles sobre los *servicios de consultoría en soluciones empresariales y documentos digitales* que tienen disponibles`;
    window.open(enlaceWhatsApp, '_blank');
  }

  redirigirAWhatsAppARCS(): void {
    let telefono = '51930794100'; // Aquí pon el número de teléfono o enlace de WhatsApp
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, me gustaría *agendar una reunión* para hablar sobre la *consultoría en soluciones empresariales con documentos digitales* que necesito para mi negocio o empresa`;
    window.open(enlaceWhatsApp, '_blank');
  }

}
