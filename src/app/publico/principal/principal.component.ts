import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MaterialModule,RouterLink],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  redirigirAWhatsApp(): void {
    // Definir el número de teléfono o enlace de WhatsApp
    let telefono = '+51900696971'; // Aquí pon el número de teléfono o enlace de WhatsApp

    // Construir el enlace de WhatsApp
    let enlaceWhatsApp = `https://wa.me/${telefono}`;

    // Redirigir al usuario a WhatsApp
    window.open(enlaceWhatsApp, '_blank');
  }

}
