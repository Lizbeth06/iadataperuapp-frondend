import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { Docente } from '../model/docente';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DocenteService extends GenericService<Docente> {
  private docenteChange: Subject<Docente[]> = new Subject<Docente[]>();
  private messageChange: Subject<string>=new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/docente`); 
  }

  setDocenteChange(data: Docente[]) {
    this.docenteChange.next(data);
  }

  getDocenteChange() {
    return this.docenteChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}