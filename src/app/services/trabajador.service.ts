import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Trabajador } from '../model/trabajador';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService extends GenericService<Trabajador>{
  private trabajadorChange: Subject<Trabajador[]> = new Subject<Trabajador[]>
  private messageChange: Subject<string>=new Subject<string>;

  constructor(
    protected override http: HttpClient,
  ) { 
    super(
      http,
      `${environment.HOST}/api/trabajador`
    );
  }

  setTrabajadorChange(data:Trabajador[]){
    this.trabajadorChange.next(data);
  }

  getTrabajadorChange(){
    return this.trabajadorChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
  
}