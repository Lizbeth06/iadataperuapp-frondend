import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Tipodocumento } from '../model/tipodocumento';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService extends GenericService<Tipodocumento>{
  private tipodocumentoChange: Subject<Tipodocumento[]> = new Subject<Tipodocumento[]>

  constructor(
    protected override http: HttpClient,
  ) { 
    super(
      http,
      `${environment.HOST}/api/tipodocumento`
    );
  }

  

  setTipodocumentoChange(data:Tipodocumento[]){
    this.tipodocumentoChange.next(data);
  }

  getTipodocumentoChange(){
    return this.tipodocumentoChange.asObservable();
  }
  

}