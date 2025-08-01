import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultaDni } from '../model/consulta-dni';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class RucService {
  private API_URL = "https://dniruc.apisperu.com/api/v1"
  private TOKEN = environment.TOKEN_DNIRUC


  constructor(private http: HttpClient) { }

  consultarRUC(ruc: string): Observable<any> {
    if (!ruc) {
      throw new Error('El RUC es requerido');
    }
    const url = `${this.API_URL}/ruc/${ruc}?token=${this.TOKEN}`;
    return this.http.get<any>(url);
  }

  consultarDni(dni:string):Observable<ConsultaDni>{
    const url = `${this.API_URL}/dni/${dni}?token=${this.TOKEN}`;
    return this.http.get<ConsultaDni>(url)
  }
}