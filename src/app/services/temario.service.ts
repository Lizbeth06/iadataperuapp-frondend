import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { Temario } from '../model/temario';

import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TemarioService extends GenericService<Temario> {
  private temarioChange: Subject<Temario[]> = new Subject<Temario[]>();
  private messageChange: Subject<string>=new Subject<string>;

  constructor(
    protected override http: HttpClient,
    private tokenService:TokenService
  ) {
    super(http, `${environment.HOST}/api/temario`); 
  }

  setTemarioChange(data: Temario[]) {
    this.temarioChange.next(data);
  }

  getTemarioChange() {
    return this.temarioChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  findByTemarioCursoId(idCurso: number): Observable<Temario[]> {
    return this.http.get<Temario[]>(`${environment.HOST}/api/temario/temarioidcurso/${idCurso}`);
  }

}