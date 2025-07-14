import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Horarios } from '../model/horarios';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HorariosService extends GenericService<Horarios>{
  private horariosChange: Subject<Horarios[]> = new Subject<Horarios[]>;
  private messageChange: Subject<string>=new Subject<string>;

  constructor(
    protected override http: HttpClient
  ) { 
    super(http, `${environment.HOST}/api/horarios`)
  }

  setHorariosChange(data: Horarios[]) {
    this.horariosChange.next(data);
  }

  getHorariosChange(){
    return this.horariosChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}