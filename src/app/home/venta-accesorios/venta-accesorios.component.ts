import { Component } from '@angular/core';

@Component({
  selector: 'app-venta-accesorios',
  standalone: true,
  imports: [],
  templateUrl: './venta-accesorios.component.html',
  styleUrl: './venta-accesorios.component.css'
})
export class VentaAccesoriosComponent {
  redirigirAWhatsAppVA(): void {
    // Definir el número de teléfono o enlace de WhatsApp
    let telefono = '51930794100'; // Aquí pon el número de teléfono o enlace de WhatsApp

    // Construir el enlace de WhatsApp
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Estoy interesado en consultar o adquirir un *accesorio*. ¿Podrían proporcionarme más detalles?`;

    // Redirigir al usuario a WhatsApp
    window.open(enlaceWhatsApp, '_blank');
  }

}
