import { Component, inject, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../model/producto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { SafeUrlPipe } from '../../../services/safeUrlPipe';

@Component({
  selector: 'app-ventasistemas-demo',
  standalone: true,
  imports: [MaterialModule, CommonModule, SafeUrlPipe],
  templateUrl: './ventasistemas-demo.component.html',
  styleUrl: './ventasistemas-demo.component.css'
})
export class VentasistemasDemoComponent implements OnInit{
  producto!: Producto;

  private productoService = inject(ProductoService);

  constructor(
      @Inject(MAT_DIALOG_DATA) private data: Producto,
      private dialogRef: MatDialogRef<VentasistemasDemoComponent>,
      private fb:FormBuilder,
    ){
  
    }

  ngOnInit(): void {
    this.producto={ ...this.data};

    if(this.producto && this.producto.idProducto){
      this.productoService.findById(this.producto.idProducto).subscribe((data)=>{
        this.producto=data;
      })
    }


  }
  

}
