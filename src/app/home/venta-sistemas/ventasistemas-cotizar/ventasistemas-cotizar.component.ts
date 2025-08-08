import { Component, Inject, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../../model/producto';
import { ProductoService } from '../../../services/producto.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipodocumentoService } from '../../../services/tipodocumento.service';
import { Tipodocumento } from '../../../model/tipodocumento';
import { debounceTime, delay, distinctUntilChanged, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { Ubigeo } from '../../../model/ubigeo';
import { UbigeoService } from '../../../services/ubigeo.service';
import { Persona } from '../../../model/persona';
import { PersonaService } from '../../../services/persona.service';
import { RucService } from '../../../services/ruc.service';
import Swal from 'sweetalert2';
import { MensajeService } from '../../../services/mensaje.service';
import { Mensaje } from '../../../model/mensaje';
 
@Component({
  selector: 'app-ventasistemas-cotizar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './ventasistemas-cotizar.component.html',
  styleUrl: './ventasistemas-cotizar.component.css'
})
export class VentasistemasCotizarComponent implements OnInit{
   form!: FormGroup;
   producto!: Producto;
   mensaje!: Mensaje;
   tipodocumento!: Tipodocumento[];
   persona!: Persona;

  departamentosDir!: Ubigeo[];
  provinciaDir!: Ubigeo[];
  distritoDir!: Ubigeo[];
   
  private productoService = inject(ProductoService);
  private tipodocumentoService = inject(TipodocumentoService);
  private ubigeoService = inject(UbigeoService);
  private personaService = inject(PersonaService);
  private rucService = inject(RucService);
  private mensajeService = inject(MensajeService);

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Producto,
    private dialogRef: MatDialogRef<VentasistemasCotizarComponent>,
    private fb:FormBuilder,
  ){
  
  }

  ngOnInit(): void {
    this.producto={ ...this.data};

    this.initForm();
    if(this.producto && this.producto.idProducto){
      this.productoService.findById(this.producto.idProducto).subscribe((data)=>{
        this.producto=data;
      })
    }

    this.tipodocumentoService.findAll().subscribe((data)=>{
      this.tipodocumento=data;
    })


    this.ubigeoService.findAllDepartments().subscribe((data)=>{
      this.departamentosDir=data;
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
      direccion:new FormControl('',[Validators.required]),
      ubiDpto:new FormControl('',[Validators.required]),
      ubiProvincia:new FormControl('',[Validators.required]),
      ubiDistrito:new FormControl('',[Validators.required]),
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

  getControlName(control: AbstractControl | null): string {
    if (!control || !this.form) {
      return ""
    }
    for (const controlName in this.form.controls) {
      if (this.form.controls[controlName] === control) {
        return controlName;
      }
    }
    return "";
  }

  obtenerProvinciaDir() {
    const ubiDpto = this.form.value['ubiDpto'];
    (ubiDpto) && this.ubigeoService.findProvinciasByDepartments(ubiDpto).subscribe(data =>
      this.provinciaDir = data
    );
  }

  obtenerDistritoDir() {
    const ubiDpto = this.form.value['ubiDpto'];
    const ubiProvincia = this.form.value['ubiProvincia'];
    (ubiDpto) && (ubiProvincia) && this.ubigeoService.findAllDistritosByProvAndDept(ubiDpto, ubiProvincia).subscribe(data =>
      this.distritoDir = data
    );
  }

  llamarNumero(): void {
    const telefono = '51930794100'; // Número de teléfono
    const enlaceTelefono = `tel:${telefono}`;
    window.location.href = enlaceTelefono;
  }

  redirigirAWhatsAppST(): void {
    let telefono = '51930794100';
    let enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola, estoy interesado en recibir información sobre el servicio de *Soporte Técnico a domicilio* que ofrecen`;
    window.open(enlaceWhatsApp, '_blank');
  }

  operate() {
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
            direccion: this.form.get('direccion')?.value,
            urllinkeding: '',
            fnacimiento: '',
            tipodocumento: { idTipoDocumento: tipodocumento } as Tipodocumento,
            ubigeo: { idUbigeo: this.form.get('ubiDistrito')?.value } as Ubigeo,
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
        this.mensaje = {
          asunto: `Cotización de ${this.producto.titulo}`,
          descripcion: '',
          tiporeunion: 1,
          fechaprogramado: new Date(),
          horainicio: '00:00',
          horafin: '00:00',
          fregistro: new Date(),
          tipomensaje: 2,
          persona: personaGuardada,
          producto: { idProducto: this.producto.idProducto } as Producto,
        } as Mensaje;

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
  }



  close(){
    this.dialogRef.close();
  }



}
