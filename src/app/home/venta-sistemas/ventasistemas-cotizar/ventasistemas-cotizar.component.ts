import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ventasistemas-cotizar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './ventasistemas-cotizar.component.html',
  styleUrl: './ventasistemas-cotizar.component.css'
})
export class VentasistemasCotizarComponent {
   form!: FormGroup;

  operate(){

  }

  buscarxDoc(){

  }

  obtenerDistritosDir(){

  }

  obtenerProvinciasDir(){

  }

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
