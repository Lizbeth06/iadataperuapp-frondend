import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { Mensaje } from '../model/mensaje';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MensajeService extends GenericService<Mensaje> {
  private mensajeChange: Subject<Mensaje[]> = new Subject<Mensaje[]>();
  private messageChange: Subject<string>=new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/mensaje`); 
  }

  setMensajeChange(data: Mensaje[]) {
    this.mensajeChange.next(data);
  }

  getMensajeChange() {
    return this.mensajeChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}