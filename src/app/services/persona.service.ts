import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Persona } from '../model/persona';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Empresa } from '../model/evaluacion';



@Injectable({
  providedIn: 'root'
})
export class PersonaService extends GenericService<Persona>{
  private personaChange: Subject<Persona[]> = new Subject<Persona[]>

  private token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5laWwuYmFuaWNvLjI3QHVuc2NoLmVkdS5wZSJ9.lXByHke5fvENCIE9GkZQNMrhz_YBaJEAB1KzJGAKwYw';


  constructor(
    protected override http: HttpClient,
  ) { 
    super(
      http,
      `${environment.HOST}/api/persona`
    );
  }

  findTipodocByNumdoc(tipodocumento:number,numdocumento:string){
    const params = new HttpParams()
    .set('tipodocumento', tipodocumento)
    .set('numdocumento', numdocumento);
  return this.http.get<Persona[]>(`${environment.HOST}/api/persona/searchxnumdoc`, { params });
  }

  setPersonaChange(data:Persona[]){ 
    this.personaChange.next(data);
  }

  getPersonaChange(){
    return this.personaChange.asObservable();
  }


  updateByCorreoTelefonoByIdpersona(idPersona: number, correo: string, telefono: string) {
  const params = new HttpParams()
    .set('idPersona', idPersona.toString())
    .set('correo', correo)
    .set('telefono', telefono);

    return this.http.put<Persona>(`${environment.HOST}/api/persona/updatecorreotelefono`, null, { params });
  }


  findPersonaRuc(ruc: string) {
    return this.http.get<Empresa>(
      `https://dniruc.apisperu.com/api/v1/ruc/${ruc}?token=${this.token}`
    );
  }

  
}