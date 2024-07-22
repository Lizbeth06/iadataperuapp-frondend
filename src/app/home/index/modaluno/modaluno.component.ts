import { Component } from '@angular/core';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
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
  selector: 'app-modaluno',
  standalone: true,
  imports: [CommonModule,MaterialModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,RouterLink],
  templateUrl: './modaluno.component.html',
  styleUrl: './modaluno.component.css'
})
export class ModalunoComponent {
  
  redirigirAWhatsAppConsultarVS(): void {
    let telefono = '51930794100'; // Aquí pon el número de teléfono o enlace de WhatsApp
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, quisiera saber más sobre el *servicios o venta de software personalizado* que ofrecen para mi negocio o empresa`;
    window.open(enlaceWhatsApp, '_blank');
  }

  redirigirAWhatsAppARVS(): void {
    let telefono = '51930794100'; // Aquí pon el número de teléfono o enlace de WhatsApp
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, me gustaría *agendar una reunión* para hablar sobre los *servicios o la venta de software personalizado* que ofrecen para mi negocio o empresa.`;
    window.open(enlaceWhatsApp, '_blank');
  }

}
