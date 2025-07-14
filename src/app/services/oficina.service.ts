import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Oficina } from '../model/oficina';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class OficinaService extends GenericService<Oficina>{
  private oficinaChange: Subject<Oficina[]> = new Subject<Oficina[]>

  constructor(
    protected override http: HttpClient,
  ) { 
    super(
      http,
      `${environment.HOST}/api/oficina`
    );
  }

  setOficinaChange(data:Oficina[]){
    this.oficinaChange.next(data);
  }

  getOficinaChange(){
    return this.oficinaChange.asObservable();
  }
  
}