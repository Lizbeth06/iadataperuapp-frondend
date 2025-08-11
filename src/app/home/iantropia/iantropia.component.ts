import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-iantropia',
  standalone: true,
  imports: [MaterialModule,CommonModule],
  templateUrl: './iantropia.component.html',
  styleUrl: './iantropia.component.css'
})
export class IantropiaComponent {

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
