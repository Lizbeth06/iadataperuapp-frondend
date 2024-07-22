import { Component,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { ModalunoComponent } from './modaluno/modaluno.component';
import { ModalconsultoriaComponent } from './modalconsultoria/modalconsultoria.component';
import { ModalsoportetecnicoComponent } from './modalsoportetecnico/modalsoportetecnico.component';
import { ModalaccesoriosComponent } from './modalaccesorios/modalaccesorios.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule,MaterialModule,RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  redirigirAWhatsApp(): void {
    // Definir el número de teléfono o enlace de WhatsApp
    let telefono = '51930794100';

    // Construir el enlace de WhatsApp
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, me gustaría recibir más detalles sobre los servicios que ofrecen.`;

    // Redirigir al usuario a WhatsApp
    window.open(enlaceWhatsApp, '_blank');
  }

  redirigirAWhatsAppAR(): void {
    // Definir el número de teléfono o enlace de WhatsApp
    let telefono = '51930794100';

    // Construir el enlace de WhatsApp
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, estoy interesado en *programar una reunión*.`;

    // Redirigir al usuario a WhatsApp
    window.open(enlaceWhatsApp, '_blank');
  }

  redirigirAWhatsAppST(): void {
    let telefono = '51930794100';
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, estoy interesado en recibir información sobre el servicio de *Soporte Técnico a domicilio* que ofrecen`;
    window.open(enlaceWhatsApp, '_blank');
  }

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




  images: string[] = ['assets/principal/img/presentacion8.png', 'assets/principal/img/presentacion9.png', 'assets/principal/img/presentacion1.png'];
  currentImage: string = this.images[0]; // Inicialmente muestra la primera imagen
  currentIndex: number = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.currentImage = this.images[this.currentIndex];
    }, 5000); // Cambia la imagen cada 5 segundos (5000 milisegundos)
  }


  constructor(public dialog: MatDialog) { }

  openModal(event: MouseEvent): void {
    // Abre el modal al pasar el mouse
    const dialogRef = this.dialog.open(ModalunoComponent, {
      width: '1000px',
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }

  openModal2(event: MouseEvent): void {
    // Abre el modal al pasar el mouse
    const dialogRef = this.dialog.open(ModalconsultoriaComponent, {
      width: '1000px',
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }

  openModal3(event: MouseEvent): void {
    // Abre el modal al pasar el mouse
    const dialogRef = this.dialog.open(ModalsoportetecnicoComponent, {
      width: '1000px',
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }

  openModal4(event: MouseEvent): void {
    // Abre el modal al pasar el mouse
    const dialogRef = this.dialog.open(ModalaccesoriosComponent, {
      width: '1000px',
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
    });
  }

}
