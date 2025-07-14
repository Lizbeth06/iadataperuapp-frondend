import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { Listahorarios } from '../model/listahorarios';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ListahorariosService extends GenericService<Listahorarios> {
  private listahorariosChange: Subject<Listahorarios[]> = new Subject<Listahorarios[]>();
  private messageChange: Subject<string>=new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/listahorarios`); 
  }

  setListahorariosChange(data: Listahorarios[]) {
    this.listahorariosChange.next(data);
  }

  getListahorariosChange() {
    return this.listahorariosChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  findByCursoId(idCurso: number): Observable<Listahorarios[]> {
    return this.http.get<Listahorarios[]>(`${environment.HOST}/api/listahorarios/listahorarioidcurso/${idCurso}`);
  }

}