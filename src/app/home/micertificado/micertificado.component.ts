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
  
  formCertificado: FormGroup;
  tipodocumento: string="";
  docSeleccionado: number = 0;
  displayedColumns: string[] = ['id', 'curso','codigo','accion'];
  dataSource!: MatTableDataSource<ListaCertificado>;
  
  private buildForm() {
    this.formCertificado = this.formBuilder.group({
      tipodocumento: ['', [Validators.required]],
      dni: ['', [ Validators.pattern(/^[0-9]{8}$/)]],
      carnet: ['', [Validators.pattern(/^[0-9]{12}$/)]],
      pass: ['', [ Validators.pattern(/^[0-9]{12}$/)]],
    })
  }
  changeTipoDoc() {
    this.tipodocumento = this.formCertificado?.get('tipodocumento')!.value ?? '';
  }
  getCertificado() {
    const numeroDoc=this.formCertificado.get('tipodocumento')!.value===1?this.formCertificado.get('dni')?.value:this.formCertificado.get('tipodocumento')!.value===2?this.formCertificado.get('carnet')!.value:
        this.formCertificado.get('pass')!.value;

    this.certificadoService.getCertificadoxdoc(numeroDoc).subscribe(data=>{
      this.crearTabla(data.body as ListaCertificado[])
    })
  
  }
  crearTabla(data: ListaCertificado[]){
    this.dataSource = new MatTableDataSource(data);
  }
  //mostrando pdf
  viewCertificadoPdf(id:number){
    this.certificadoService.generarPdfCertificado(id).subscribe(data=>{
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
    if(this.formCertificado.get('dni')?.value.length>=8 || this.formCertificado.get('carnet')!.value.length>=12||this.formCertificado.get('pass')!.value.length>=8){
      return true
    }
    return false;
  }
}
