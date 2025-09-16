import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { TokenService } from './token.service';
import { ListaConstancia } from '../model/constancia';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConstanciaService extends GenericService<ListaConstancia> {
  private constanciaChange: Subject<ListaConstancia[]> = new Subject<ListaConstancia[]>();
  private messageChange: Subject<string>=new Subject<string>;

  constructor(
    protected override http: HttpClient,
    private tokenService:TokenService
  ) {
    super(http, `${environment.HOST}/api/constancia`); 
  }

  setConstanciaChange(data: ListaConstancia[]) {
    this.constanciaChange.next(data);
  }

  getConstanciaChange() {
    return this.constanciaChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
  getConstanciaxdoc(numDoc:string){
    const token: string = this.tokenService.getToken() ?? '';
    return this.http.get(`${environment.HOST}/api/constancia/numerodoc/${numDoc}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },observe : 'response'
    });
  } 
  //Pdf
  generarPdfConstancia(id:number){
    const token: string = this.tokenService.getToken() ?? '';
    return this.http.get(`${environment.HOST}/api/reporte/constancia/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },responseType:'blob' 
    } );
  }
}
