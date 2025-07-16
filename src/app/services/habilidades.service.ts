import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { Habilidades } from '../model/habilidades';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService extends GenericService<Habilidades> {
  private habilidadesChange: Subject<Habilidades[]> = new Subject<Habilidades[]>();
  private messageChange: Subject<string>=new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/habilidades`); 
  }

  setHabilidadesChange(data: Habilidades[]) {
    this.habilidadesChange.next(data);
  }

  getHabilidadesChange() {
    return this.habilidadesChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  findByHabilidadesCursoId(idCurso: number): Observable<Habilidades[]> {
    return this.http.get<Habilidades[]>(`${environment.HOST}/api/habilidades/habilidadesidcurso/${idCurso}`);
  }

}