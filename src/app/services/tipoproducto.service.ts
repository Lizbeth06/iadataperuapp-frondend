import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

import { Tipoproducto } from '../model/tipoproducto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TipoproductoService extends GenericService<Tipoproducto> {
  private tipoproductoChange: Subject<Tipoproducto[]> = new Subject<Tipoproducto[]>();
  private messageChange: Subject<string>=new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/tipoProducto`); 
  }

  setTipoproductoChange(data: Tipoproducto[]) {
    this.tipoproductoChange.next(data);
  }

  getTipoproductoChange() {
    return this.tipoproductoChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

}