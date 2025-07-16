import { Component, inject, LOCALE_ID, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../model/curso';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [MaterialModule,RouterModule,CommonModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css',
  providers: [
      { provide: LOCALE_ID, useValue: 'es' },  // Establecer la configuración regional
      DatePipe
    ]
})
export class CheckoutFormComponent implements OnInit {
  readonly panelOpenState = signal(false);
   idCurso: number | undefined;
   cursoslista!: Curso;

   private cursoService= inject(CursoService);

  ngOnInit(): void {
    const state = history.state;
    this.idCurso = state?.idCurso;

    if (!this.idCurso){
      console.warn('No se recibió ID del curso');
    } else {

      this.cursoService.findById(this.idCurso).subscribe((datas)=>{
        this.cursoslista=datas;
      })

    }
  }


  redirigirAWhatsApp(): void {
    const telefono = '51918496515';
    const nombreCurso = this.cursoslista?.titulo || 'el curso';
    const mensaje = encodeURIComponent(
      `Hola, quiero más información y voy enviar mis requisitos del curso "${nombreCurso}"`
    );

    const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=${mensaje}`;
    window.open(enlaceWhatsApp, '_blank');
  }

}