import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { MaterialModule } from '../../../material/material.module';
import {MatChipsModule} from '@angular/material/chips';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-taller',
  standalone: true,
  imports: [MaterialModule,MatExpansionModule,MatChipsModule,RouterLink],
  templateUrl: './detalle-taller.component.html',
  styleUrl: './detalle-taller.component.css'
})
export class DetalleTallerComponent {
  readonly panelOpenState = signal(false);

  redirigirAWhatsApp(): void {
    // Definir el número de teléfono o enlace de WhatsApp
    let telefono = '51918496515'; // Aquí pon el número de teléfono o enlace de WhatsApp

    // Construir el enlace de WhatsApp
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola quiero más información sobre el Taller *Innovación e Emprendimientos*`;

    // Redirigir al usuario a WhatsApp
    window.open(enlaceWhatsApp, '_blank');
  }
}
