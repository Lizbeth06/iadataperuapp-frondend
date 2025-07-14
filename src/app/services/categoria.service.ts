import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { Categoria, ListaCategoriasxcurso } from '../model/categoria';

import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends GenericService<Categoria> {
  private categoriaChange: Subject<Categoria[]> = new Subject<Categoria[]>();
  private messageChange: Subject<string>=new Subject<string>;

  constructor(
    protected override http: HttpClient,
    private tokenService:TokenService
  ) {
    super(http, `${environment.HOST}/api/categoria`); 
  }

  setCategoriaChange(data: Categoria[]) {
    this.categoriaChange.next(data);
  }

  getCategoriaChange() {
    return this.categoriaChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
  getCategoriaxcurso(idCategoria:number){
    const token: string = this.tokenService.getToken() ?? '';
    return this.http.get<ListaCategoriasxcurso>(`${environment.HOST}/api/categoria/categoria-curso/${idCategoria}`,{
      headers: {
        Authorization: `Bearer ${token}`
      },observe : 'response'
    });
  }
}