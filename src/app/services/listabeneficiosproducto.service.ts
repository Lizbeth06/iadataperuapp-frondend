import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GenericService } from './generic.service';


import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';
import { Listabeneficiosproducto } from '../model/listabeneficiosproducto';

@Injectable({
  providedIn: 'root'
})
export class ListabeneficiosproductoService extends GenericService<Listabeneficiosproducto> {
  private listabeneficiosproductoChange: Subject<Listabeneficiosproducto[]> = new Subject<Listabeneficiosproducto[]>();
  private messageChange: Subject<string>=new Subject<string>;

  constructor(
    protected override http: HttpClient,
    private tokenService:TokenService
  ) {
    super(http, `${environment.HOST}/api/listabeneficiosproducto`); 
  }

  setListabeneficiosproductoChange(data: Listabeneficiosproducto[]) {
    this.listabeneficiosproductoChange.next(data);
  }

  getListabeneficiosproductoChange() {
    return this.listabeneficiosproductoChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  findByProductoBeneficiosId(idProducto: number): Observable<Listabeneficiosproducto[]> {
      return this.http.get<Listabeneficiosproducto[]>(`${environment.HOST}/api/listabeneficiosproducto/listabeneficiosidproducto/${idProducto}`);
  }

}