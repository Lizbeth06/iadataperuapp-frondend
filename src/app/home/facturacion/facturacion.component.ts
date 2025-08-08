import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facturacion',
  standalone: true,
  imports: [MaterialModule,CommonModule],
  templateUrl: './facturacion.component.html',
  styleUrl: './facturacion.component.css'
})
export class FacturacionComponent {
  redirigirAWhatsAppPlan1(): void {
    let telefono = '51930794100';
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, ¿podrían proporcionarme información sobre el *Plan Básico* de Facturación Electrónica?`;
    window.open(enlaceWhatsApp, '_blank');
  }

  redirigirAWhatsAppPlan2(): void {
    let telefono = '51930794100';
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, ¿podrían proporcionarme información sobre el *Plan Emprendedor* de Facturación Electrónica?`;
    window.open(enlaceWhatsApp, '_blank');
  }

  redirigirAWhatsAppPlan3(): void {
    let telefono = '51930794100';
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, ¿podrían proporcionarme información sobre el *Plan Empresial* de Facturación Electrónica?`;
    window.open(enlaceWhatsApp, '_blank');
  }

}
