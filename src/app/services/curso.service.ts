import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { Curso } from '../model/curso';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CursoService extends GenericService<Curso> {
  private cursoChange: Subject<Curso[]> = new Subject<Curso[]>();
  private messageChange: Subject<string>=new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/curso`); 
  }

  setCursoChange(data: Curso[]) {
    this.cursoChange.next(data);
  }

  getCursoChange() {
    return this.cursoChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  //para mandar archivo al back
  saveFile(data: File) {
    const formdata: FormData = new FormData();
    formdata.append('file', data);
    return this.http.post<{ url: string }>(`${environment.HOST}/api/curso/saveFile`, formdata);
  }

  findAllTitulo(titulo:string){
    return this.http.get<Curso[]>(`${environment.HOST}/api/curso/detalletitulo/${titulo}`)
  } 

  
}