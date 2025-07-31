import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Listadetalleproducto } from '../model/listadetalleproducto';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ListadetalleproductoService extends GenericService<Listadetalleproducto>{
  private listadetalleproductoChange: Subject<Listadetalleproducto[]> = new Subject<Listadetalleproducto[]>;
  private messageChange: Subject<string>=new Subject<string>;

  constructor(
    protected override http: HttpClient
  ) { 
    super(http, `${environment.HOST}/api/listadetalleproducto`)
  }

  setListadetalleproductoChange(data: Listadetalleproducto[]) {
    this.listadetalleproductoChange.next(data);
  }

  getListadetalleproductoChange(){
    return this.listadetalleproductoChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  findByProductoDetalleId(idProducto: number): Observable<Listadetalleproducto[]> {
        return this.http.get<Listadetalleproducto[]>(`${environment.HOST}/api/listadetalleproducto/listadetalleidproducto/${idProducto}`);
  }
}