import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { Listadocente } from '../model/listadocente';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ListadocenteService extends GenericService<Listadocente> {
  private listadocenteChange: Subject<Listadocente[]> = new Subject<Listadocente[]>();
  private messageChange: Subject<string>=new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/listadocente`); 
  }

  setListadocenteChange(data: Listadocente[]) {
    this.listadocenteChange.next(data);
  }

  getListadocenteChange() {
    return this.listadocenteChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  findByDocenteCursoId(idCurso: number): Observable<Listadocente[]> {
      return this.http.get<Listadocente[]>(`${environment.HOST}/api/listadocente/listadocenteidcurso/${idCurso}`);
    }

}