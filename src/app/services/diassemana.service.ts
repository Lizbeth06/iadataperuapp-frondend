import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Diassemana } from '../model/diassemana';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DiassemanaService extends GenericService<Diassemana>{
  private diassemanaChange: Subject<Diassemana[]> = new Subject<Diassemana[]>;
  private messageChange: Subject<string>=new Subject<string>;

  constructor(
    protected override http: HttpClient
  ) { 
    super(http, `${environment.HOST}/api/diassemana`)
  }

  setDiassemanaChange(data: Diassemana[]) {
    this.diassemanaChange.next(data);
  }

  getDiassemanaChange(){
    return this.diassemanaChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}