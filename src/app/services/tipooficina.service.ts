import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Tipooficina } from '../model/tipooficina';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class TipooficinaService extends GenericService<Tipooficina>{

  private tipooficinaChange: Subject<Tipooficina[]> = new Subject<Tipooficina[]>

  constructor(
    protected override http: HttpClient,
  ) { 
    super(
      http,
      `${environment.HOST}/api/tipooficina`
    );
  }

  setTipooficinaChange(data:Tipooficina[]){
    this.tipooficinaChange.next(data);
  }

  getTipooficinaChange(){
    return this.tipooficinaChange.asObservable();
  }
  
}