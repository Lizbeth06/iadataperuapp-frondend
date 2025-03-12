import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-servicio-tecnico',
  standalone: true,
  imports: [MaterialModule,MatExpansionModule,MatChipsModule,MatCardModule],
  templateUrl: './servicio-tecnico.component.html',
  styleUrl: './servicio-tecnico.component.css'
})
export class ServicioTecnicoComponent {

  llamarNumero(): void {
    const telefono = '51930794100'; // Número de teléfono
    const enlaceTelefono = `tel:${telefono}`;
    window.location.href = enlaceTelefono;
  }

  redirigirAWhatsAppST(): void {
    let telefono = '51930794100';
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, estoy interesado en recibir información sobre el servicio de *Soporte Técnico a domicilio* que ofrecen`;
    window.open(enlaceWhatsApp, '_blank');
  }

  
}
