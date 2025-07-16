import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, LOCALE_ID, OnInit, signal } from '@angular/core';
import { Curso } from '../../../model/curso';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule, DatePipe } from '@angular/common';
import { Listahorarios } from '../../../model/listahorarios';
import { ListahorariosService } from '../../../services/listahorarios.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Listadocente } from '../../../model/listadocente';
import { ListadocenteService } from '../../../services/listadocente.service';
import { HabilidadesService } from '../../../services/habilidades.service';
import { Habilidades } from '../../../model/habilidades';
import { TemarioService } from '../../../services/temario.service';
import { Temario } from '../../../model/temario';
import { register } from 'swiper/element/bundle';

// Registrar los componentes web de Swiper (incluye Coverflow, Pagination, etc.)
register();

@Component({
  selector: 'app-curso-detalle',
  standalone: true,
  imports: [MaterialModule,RouterLink,CommonModule],
  templateUrl: './curso-detalle.component.html',
  styleUrl: './curso-detalle.component.css',
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },  // Establecer la configuración regional
    DatePipe  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CursoDetalleComponent implements OnInit{

  

  readonly panelOpenState = signal(false);
  
    redirigirAWhatsApp(): void {
      // Definir el número de teléfono o enlace de WhatsApp
      let telefono = '51918496515'; // Aquí pon el número de teléfono o enlace de WhatsApp
  
      // Construir el enlace de WhatsApp
      let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola quiero más información sobre el Taller *Innovación e Emprendimientos*`;
  
      // Redirigir al usuario a WhatsApp
      window.open(enlaceWhatsApp, '_blank');
    }

  titulo: string;
  cursos!:Curso[];
  cursoslista!:Curso[];
  listacursovisitas!:Curso[];
  listahorarios: Listahorarios[] = [];
  listadocente: Listadocente[] = [];
  horariosPorCurso: { [idCurso: number]: Listahorarios[] } = {};
  docentePorCurso: { [idCurso: number]: Listadocente[] } = {};
  habilidadesPorCurso: { [idCurso: number]: Habilidades[] } = {};
  temarioPorCurso: { [idCurso: number]: Temario[] } = {};
  baseUrl: string = window.location.origin;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  private cursoService= inject(CursoService);
  private datePipe = inject(DatePipe);
  private listahorariosService = inject(ListahorariosService);
  private listadocenteService = inject(ListadocenteService);
  private habilidadesService = inject(HabilidadesService);
  private temarioService = inject(TemarioService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
    this.titulo = this.route.snapshot.paramMap.get('titulo') || '';

    //console.log("titulo:", this.titulo);

    this.cursoService.findAll().subscribe((datas)=>{
      this.cursoslista=datas;
    })

    this.cursoService.findAllTitulo(this.titulo).subscribe((data) => { 
      this.cursos = data;
      if (this.cursos.length > 0) {
        this.registrarVisita(this.cursos[0]); // Solo a la primera actividad con ese título
      }
      //listarhorarios
      this.cursos.forEach(curso => {
        this.listahorariosService.findByCursoId(curso.idCurso).subscribe(horarios => {
          this.horariosPorCurso[curso.idCurso] = horarios;
        });
      });

      //listardocentes
      this.cursos.forEach(curso => {
        this.listadocenteService.findByDocenteCursoId(curso.idCurso).subscribe(docentes => {
          this.docentePorCurso[curso.idCurso] = docentes;
        });
      });

      //lista de habilidades
      this.cursos.forEach(curso =>{
        this.habilidadesService.findByHabilidadesCursoId(curso.idCurso).subscribe(habilidades => {
          const habilidadesActivas = habilidades.filter(h => h.estado === 1);
          this.habilidadesPorCurso[curso.idCurso] = habilidadesActivas;
        });
      })

      //lista de temarios
      this.cursos.forEach(curso =>{
        this.temarioService.findByTemarioCursoId(curso.idCurso).subscribe(temario => {
          this.temarioPorCurso[curso.idCurso] = temario;
        });
      })


    });
    
    this.cursoService.findAll().subscribe((data) => {
      this.listacursovisitas = data
        .sort((a, b) => b.totalvisitas - a.totalvisitas) // orden descendente
        .slice(0, 3); // tomar solo las 3 primeras
    });

    

   });
    
   
  }


  registrarVisita(curso: Curso) {
    const key = `visita_curso_${curso.idCurso}`;
    const stored = localStorage.getItem(key);
    const today = this.getTodayDate();

  
      curso.totalvisitas++;
      localStorage.setItem(key, today);

      // Llamar backend para actualizar totalvisitas
      this.cursoService.update(curso.idCurso, curso).subscribe(() => {
        console.log('Visita registrada');
      });
   
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().slice(0, 10);
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

  getIframeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }


  compartirWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${url}`, '_blank');
  }

  compartirFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  compartirLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  }



}
