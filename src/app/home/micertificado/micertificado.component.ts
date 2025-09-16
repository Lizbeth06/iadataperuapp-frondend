import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MaterialModule } from '../../material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { validarInput, ValidationType } from '../../util/validaciones.util';
import { CertificadoService } from '../../services/certificado.service';
import { MatTableDataSource } from '@angular/material/table';
import { ListaCertificado } from '../../model/certificado';
import { ListaConstancia } from '../../model/constancia';
import { ConstanciaService } from '../../services/constancia.service';

@Component({
  selector: 'app-micertificado',
  standalone: true,
  imports: [MaterialModule,FormsModule,ReactiveFormsModule,MatIconModule],
  templateUrl: './micertificado.component.html',
  styleUrl: './micertificado.component.css'
})
export class MicertificadoComponent {

  constructor(
    private formBuilder:FormBuilder
  ) {
    this.buildForm();
  }
  private certificadoService=inject(CertificadoService);
  private constanciaService=inject(ConstanciaService);
  
  formDocumento: FormGroup;
  tipodocumento: string="";
  docImprimir: string="";
  docSeleccionado: number = 0;
  displayedColumns: string[] = ['id', 'curso','codigo','accion'];
  constanciaColumns: string[] = ['id','nombre','codigo','accion'];
  dataCertificado!: MatTableDataSource<ListaCertificado>;
  dataConstancia!: MatTableDataSource<ListaConstancia>;
  
  private buildForm() {
    this.formDocumento = this.formBuilder.group({
      imprimirdoc: ['', [Validators.required]],
      tipodocumento: ['', [Validators.required]],
      dni: ['', [ Validators.pattern(/^[0-9]{8}$/)]],
      carnet: ['', [Validators.pattern(/^[0-9]{12}$/)]],
      pass: ['', [ Validators.pattern(/^[0-9]{12}$/)]],
    })
  }
  changeTipoDoc() {
    this.tipodocumento = this.formDocumento?.get('tipodocumento')!.value ?? '';
  }
  changeImprimir() {
    this.docImprimir = this.formDocumento?.get('imprimirdoc')!.value ?? '';
  }
  getDocImprimir() {
    const numeroDoc=this.formDocumento.get('tipodocumento')!.value===1?this.formDocumento.get('dni')?.value:this.formDocumento.get('tipodocumento')!.value===2?this.formDocumento.get('carnet')!.value:
        this.formDocumento.get('pass')!.value;
    if(this.docImprimir=='2'){
      this.certificadoService.getCertificadoxdoc(numeroDoc).subscribe(data=>{
        this.crearTabla(data.body as ListaCertificado[])
      })

    }else{
      this.constanciaService.getConstanciaxdoc(numeroDoc).subscribe(data=>{
        this.crearTabla(data.body as ListaConstancia[])
      })
    }

  
  }
  crearTabla(data: any[]){
     if(this.docImprimir=='1'){
      console.log(data);
      this.dataConstancia = new MatTableDataSource(data);
     }
     else{
      this.dataCertificado = new MatTableDataSource(data);
    }
  }
  //mostrando pdf
  viewCertificadoPdf(id:number){
    this.certificadoService.generarPdfCertificado(id).subscribe(data=>{
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }
  viewConstanciaPdf(id:number){
    this.constanciaService.generarPdfConstancia(id).subscribe(data=>{
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }
  //Limite de ingresar solo numeros en un input
  validarNumeros(event:KeyboardEvent, type:ValidationType) {
    validarInput(event,type);
  }
  mostrarTabla():boolean{
    if(this.formDocumento.get('dni')?.value.length>=8 || this.formDocumento.get('carnet')!.value.length>=12||this.formDocumento.get('pass')!.value.length>=8){
      return true
    }
    return false;
  }
}
