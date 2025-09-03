import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { ListaCertificado } from '../model/certificado';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService extends GenericService<ListaCertificado> {
  private certificadoChange: Subject<ListaCertificado[]> = new Subject<ListaCertificado[]>();
  private messageChange: Subject<string>=new Subject<string>;

  constructor(
    protected override http: HttpClient,
    private tokenService: TokenService
  ) {
    super(http, `${environment.HOST}/api/certificado`); 
  }

  setCertificadoChange(data: ListaCertificado[]) {
    this.certificadoChange.next(data);
  }

  getCertificadoChange() {
    return this.certificadoChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  getCertificadoxdoc(numDoc:string){
    const token: string = this.tokenService.getToken() ?? '';
    return this.http.get(`${environment.HOST}/api/certificado/numerodoc/${numDoc}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },observe : 'response'
    });
  } 
  //Pdf
  generarPdfCertificado(id:number){
    const token: string = this.tokenService.getToken() ?? '';
    return this.http.get(`${environment.HOST}/api/reporte/certificado/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },responseType:'blob' 
    } );
  } 
}
