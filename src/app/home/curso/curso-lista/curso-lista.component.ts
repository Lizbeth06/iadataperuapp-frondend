import { Component, inject, LOCALE_ID, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { Curso } from '../../../model/curso';
import { CursoService } from '../../../services/curso.service';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule, DatePipe } from '@angular/common';
import { ListahorariosService } from '../../../services/listahorarios.service';
import { Listahorarios } from '../../../model/listahorarios';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-curso-lista',
  standalone: true,
  imports: [MaterialModule,CommonModule,RouterLink],
  templateUrl: './curso-lista.component.html',
  styleUrl: './curso-lista.component.css',
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },  // Establecer la configuración regional
    DatePipe  
  ]
})
export class CursoListaComponent implements OnInit{
  cursos: Curso[] = [];
  listahorarios: Listahorarios[] = [];
  cursoPaginada: Curso[] = [];
  locale = inject(LOCALE_ID);
  horariosPorCurso: { [idCurso: number]: Listahorarios[] } = {};
  // valores por defecto
  pageSize = 6;
  pageIndex = 0;

  private cursoService = inject(CursoService);
  private datePipe = inject(DatePipe);

  private listahorariosService = inject(ListahorariosService);

  ngOnInit(): void {
    this.cursoService.findAll().subscribe(data => {
      this.cursos = data.sort((a, b) => b.idCurso - a.idCurso); 
    
      this.setPaginado();

      //listarhorarios
      this.cursos.forEach(curso => {
        this.listahorariosService.findByCursoId(curso.idCurso).subscribe(horarios => {
          this.horariosPorCurso[curso.idCurso] = horarios;
        });
      });
      


    });



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




  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setPaginado();
  }

  setPaginado(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.cursoPaginada = this.cursos.slice(start, end);
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



  
   
}
