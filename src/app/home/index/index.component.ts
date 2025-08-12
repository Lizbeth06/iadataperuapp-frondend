import { Component,CUSTOM_ELEMENTS_SCHEMA,inject,LOCALE_ID,OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { ModalunoComponent } from './modaluno/modaluno.component';
import { ModalconsultoriaComponent } from './modalconsultoria/modalconsultoria.component';
import { ModalsoportetecnicoComponent } from './modalsoportetecnico/modalsoportetecnico.component';
import { ModalaccesoriosComponent } from './modalaccesorios/modalaccesorios.component';
import { AfterViewInit } from '@angular/core';
import { tns } from 'tiny-slider/src/tiny-slider'; 
import { AgendarFormComponent } from '../agendar/agendar-form/agendar-form.component';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../model/curso';
import { Listahorarios } from '../../model/listahorarios';
import { SafeHtml } from '@angular/platform-browser'; 
import { register } from 'swiper/element/bundle';

// Registrar los componentes web de Swiper (incluye Coverflow, Pagination, etc.)
register();

declare var bootstrap: any;
@Component({
  selector: 'app-index', 
  standalone: true,
  imports: [CommonModule,MaterialModule,RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
  providers: [
      { provide: LOCALE_ID, useValue: 'es' },  // Establecer la configuración regional
      DatePipe 
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IndexComponent implements AfterViewInit {

  cursoslista!:Curso[];
  horariosPorCurso: { [idCurso: number]: Listahorarios[] } = {};

  private datePipe = inject(DatePipe);
  private cursoService= inject(CursoService);

  ngAfterViewInit() {
    
  const carouselElement = document.querySelector('#carouselFotos');
      if (carouselElement) {
        new bootstrap.Carousel(carouselElement, {
          interval: 3000,
          ride: 'carousel'
        });
      }

  }
  
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

    this.cursoService.findAll().subscribe((datas)=>{
      this.cursoslista=datas;
    })
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

  openDialogAgendar(idProducto: number, tipomensaje: number): void {
    this.dialog.open(AgendarFormComponent, {
      width: '1500px',
      backdropClass: '',
      disableClose: false,
      data: {
        idProducto: idProducto,
        tipomensaje: tipomensaje
      }
    });
  }

  getStatus(fechaInicio: Date, fechaFinal: Date) {
    const currentDate = new Date();

    // Convertir las fechas de string a objetos Date si es necesario
    const startDate = new Date(fechaInicio);
    const endDate = new Date(fechaFinal);

    // Si la fecha de inicio aún no ha llegado
    if (currentDate < startDate) {
      return {
        status: 'Próximamente',
        color: 'green',
        formattedDate: this.datePipe.transform(startDate, 'd MMMM yyyy')!
      };
    }
    // Si la fecha de inicio ha pasado pero la fecha final aún no ha llegado
    else if (currentDate >= startDate && currentDate <= endDate) {
      return {
        status: 'Ya inicializado',
        color: 'blue',
        formattedDate: ''
      };
    }
    // Si la fecha final ya pasó
    else if (currentDate > endDate) {
      return {
        status: 'Finalizado',
        color: 'gray',
        formattedDate: ''
      };
    }

    // Si no se cumple ninguna condición, se devuelve un estado indeterminado
    return {
      status: 'Indeterminado',
      color: 'gray',
      formattedDate: ''
    };
  }

  formatHora(hora: Date | string): string {
        if (!hora) return '';
  
        if (hora instanceof Date) {
          if (isNaN(hora.getTime())) return ''; // fecha inválida
          return hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        }
  
        // Si es string y tiene formato "HH:mm:ss" sin fecha, solo corta el string
        if (typeof hora === 'string') {
          if (hora.length >= 5) {
            return hora.slice(0, 5); // "16:00" de "16:00:00"
          }
          return hora; // o cadena vacía si quieres
        }
  
        return '';
    }
  
   


}
