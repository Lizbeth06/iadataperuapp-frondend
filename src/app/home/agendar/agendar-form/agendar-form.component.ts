import { Component, inject, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../../model/producto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from '../../../services/producto.service';
import { TipodocumentoService } from '../../../services/tipodocumento.service';
import { Tipodocumento } from '../../../model/tipodocumento';
import Swal from 'sweetalert2';
import { debounceTime, distinctUntilChanged, filter, of, switchMap, tap } from 'rxjs';
import { RucService } from '../../../services/ruc.service';
import { PersonaService } from '../../../services/persona.service';
import { Persona } from '../../../model/persona';
import { Mensaje } from '../../../model/mensaje';
import { MensajeService } from '../../../services/mensaje.service';
import { Ubigeo } from '../../../model/ubigeo';

@Component({
  selector: 'app-agendar-form',
  standalone: true,
  imports: [MaterialModule,CommonModule],
  templateUrl: './agendar-form.component.html',
  styleUrl: './agendar-form.component.css'
})
export class AgendarFormComponent implements OnInit{
  form!: FormGroup;
  producto!: Producto;
  mensaje!: Mensaje;
  tipodocumento!: Tipodocumento[];
  persona!: Persona;
  tipomensaje!: number;

  private productoService = inject(ProductoService);
  private tipodocumentoService = inject(TipodocumentoService);
  private personaService = inject(PersonaService);
  private rucService = inject(RucService);
  private mensajeService = inject(MensajeService);

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { idProducto: number; tipomensaje: number },
    private dialogRef: MatDialogRef<AgendarFormComponent>,
    private fb:FormBuilder
  ){
  
  }

  ngOnInit(): void { 
    this.tipomensaje = this.data.tipomensaje;

    this.initForm();
    if (this.data.idProducto) {
      this.productoService.findById(this.data.idProducto).subscribe((data) => {
        this.producto = data;
      });
    }

    this.tipodocumentoService.findAll().subscribe((data)=>{
      this.tipodocumento=data;
    })

    // Suscripción para detectar cuando se escribe el documento
      this.form.get('numDocumento')?.valueChanges
        .pipe(
          debounceTime(300), // para esperar a que termine de escribir
          distinctUntilChanged()
        )
        .subscribe((value: string) => {
          const tipodocumento = this.form.get('tipodocumento')?.value;
  
          if (
            (tipodocumento === 1 && value?.length === 8) ||
            (tipodocumento === 3 && value?.length === 11)
          ) {
            this.existePersonaPorDocumento();
          }
      });


  }

  initForm(){
      this.form=new FormGroup({
        tipodocumento:new FormControl(1,[Validators.required]),
        numDocumento:new FormControl('',[Validators.required]),
        nombres:new FormControl('',[Validators.required]),
        apaterno:new FormControl(''),
        amaterno:new FormControl(''),
        telefono:new FormControl('',[Validators.required]),
        correo:new FormControl('',[Validators.required]),
        asunto:new FormControl('',[Validators.required]),
        fechaprogramado:new FormControl('',[Validators.required]),
        horainicio:new FormControl('',[Validators.required]),
        horafin:new FormControl('',[Validators.required]),
        tiporeunion:new FormControl(1,[Validators.required]),
      })
  }

  existePersonaPorDocumento() {
    const tipodocumento = this.form.value['tipodocumento'];
    const numDocumento = this.form.value['numDocumento']?.trim();

    // Validaciones por tipo de documento
    if (tipodocumento === 1 && numDocumento.length !== 8) {
      Swal.fire({
        icon: 'warning',
        title: 'DNI inválido',
        text: 'El número de DNI debe tener 8 dígitos.',
      });
      return;
    }

    if (tipodocumento === 3 && numDocumento.length !== 11) {
      Swal.fire({
        icon: 'warning',
        title: 'RUC inválido',
        text: 'El número de RUC debe tener 11 dígitos.',
      });
      return;
    }

    // Consulta por DNI en BD o API externa
    if (tipodocumento === 1) {
      this.personaService.findTipodocByNumdoc(tipodocumento, numDocumento).pipe(
        switchMap(personas => {
          const persona = Array.isArray(personas) ? personas[0] : personas;

          if (persona) {
            this.form.patchValue({
              nombres: persona.nombres,
              amaterno: persona.amaterno,
              apaterno: persona.apaterno,
              correo: persona.correo,
              telefono: persona.telefono,
            });
            return of(null); // No llamar API externa
          } else {
            return this.rucService.consultarDni(numDocumento).pipe(
              filter(data => data.success !== false),
              tap(dataFiltrada => {
                this.form.patchValue({
                  nombres: dataFiltrada.nombres,
                  amaterno: dataFiltrada.apellidoMaterno,
                  apaterno: dataFiltrada.apellidoPaterno
                });
              })
            );
          }
        })
      ).subscribe();
    }

    // Consulta por RUC
    if (tipodocumento === 3) {
      this.rucService.consultarRUC(numDocumento).pipe(
        filter(data => data.success !== false),
        tap(dataFiltrada => {
          this.form.patchValue({
            nombres: dataFiltrada.razonSocial,
            direccion: dataFiltrada.direccion,
          });
        })
      ).subscribe();
    }
  }

  operate(tipomensaje: number) {
      const tipodocumento = this.form.get('tipodocumento')?.value;
      const numDocumento = this.form.get('numDocumento')?.value;
  
      this.personaService.findTipodocByNumdoc(tipodocumento, numDocumento).pipe(
        switchMap(personasEncontradas => {
          if (personasEncontradas && personasEncontradas.length > 0) {
            return of(personasEncontradas[0]); // ya existe
          } else {
            // guardar nueva persona sin esperar respuesta con id
            const personaNueva: Persona = {
              numDocumento: numDocumento,
              nombres: this.form.get('nombres')?.value,
              apaterno: this.form.get('apaterno')?.value,
              amaterno: this.form.get('amaterno')?.value,
              genero: this.form.get('genero')?.value ?? 1,
              correo: this.form.get('correo')?.value,
              telefono: this.form.get('telefono')?.value,
              direccion: '',
              urllinkeding: '',
              fnacimiento: '',
              tipodocumento: { idTipoDocumento: tipodocumento } as Tipodocumento,
              ubigeo: null,
            } as Persona;
  
            return this.personaService.save(personaNueva).pipe(
              // 🔁 luego del POST, consultar por documento para obtener el idPersona
              switchMap(() =>
                this.personaService.findTipodocByNumdoc(tipodocumento, numDocumento).pipe(
                  switchMap(result => {
                    if (result && result.length > 0) {
                      return of(result[0]); // <- devuelve directamente el Observable<Persona>
                    } else {
                      throw new Error('No se pudo obtener persona recién creada.');
                    }
                  })
                )
              )
  
  
  
            );
          }
        }),
        switchMap((personaGuardada: Persona) => {
          const fecha = this.form.get('fechaprogramado')?.value;

          //console.log('tipo mesnaje:', tipomensaje);
          //console.log('fecha:', fecha);

          if(tipomensaje==2){
            this.mensaje = {
              asunto: this.form.get('asunto')?.value,
              descripcion: `Cotización de ${this.producto.titulo}`,
              tiporeunion: this.form.get('tiporeunion')?.value,
              fechaprogramado: fecha,
              horainicio: this.combineFechaYHora(fecha, this.form.get('horainicio')?.value),
              horafin: this.combineFechaYHora(fecha, this.form.get('horafin')?.value),
              fregistro: new Date(),
              tipomensaje: tipomensaje,
              persona: personaGuardada,
              producto: { idProducto: this.producto.idProducto } as Producto,
            } as Mensaje;

          }else{
            this.mensaje = {
              asunto: this.form.get('asunto')?.value,
              descripcion: this.form.get('asunto')?.value,
              tiporeunion: this.form.get('tiporeunion')?.value,
              fechaprogramado: fecha,
              horainicio: this.combineFechaYHora(fecha, this.form.get('horainicio')?.value),
              horafin: this.combineFechaYHora(fecha, this.form.get('horafin')?.value),
              fregistro: new Date(),
              tipomensaje: tipomensaje,
              persona: personaGuardada,
              producto: null,
            } as Mensaje;

          }

          

  
          return this.mensajeService.save(this.mensaje);
        })
      ).subscribe({
        next: () => {
          this.mensajeService.findAll().subscribe(data => {
            this.mensajeService.setMensajeChange(data);
            this.mensajeService.setMessageChange('SE REGISTRÓ');
          });
  
          Swal.fire({
            icon: 'success',
            title: 'Cotización enviada',
            text: 'Tu mensaje fue registrado correctamente.',
            confirmButtonText: 'Aceptar'
          });
  
          this.close();
        },
        error: err => {
          console.error('Error al registrar mensaje:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un problema al guardar el mensaje.',
          });
        }
      });

      //console.log('Hora enviada:', this.combineFechaYHora(this.form.get('fechaprogramado')?.value, this.form.get('horainicio')?.value));

    }

    private combineFechaYHora(fecha: Date, hora: string): string {
      const [hours, minutes] = hora.split(':').map(Number);

      // Construimos una cadena con la fecha y hora manualmente
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, '0');
      const day = String(fecha.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}T${hora}:00`; // formato ISO sin zona horaria
    }


  
  
  
    close(){
      this.dialogRef.close();
    }

}
