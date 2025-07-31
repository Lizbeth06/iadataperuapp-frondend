import { Component, Inject, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../../model/producto';
import { ProductoService } from '../../../services/producto.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipodocumentoService } from '../../../services/tipodocumento.service';
import { Tipodocumento } from '../../../model/tipodocumento';

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
   tipodocumento!: Tipodocumento[];
   
  private productoService = inject(ProductoService);
  private tipodocumentoService = inject(TipodocumentoService);

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
      idepartamento:new FormControl('',[Validators.required]),
      idprovincia:new FormControl('',[Validators.required]),
      iddistrito:new FormControl('',[Validators.required]),
    })
  }

  operate(){

  }

  buscarxDoc(){

  }

  obtenerDistritosDir(){

  }

  obtenerProvinciasDir(){

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

}
