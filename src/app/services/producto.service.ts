import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Producto } from '../model/producto';
import { environment } from '../../environments/environment.development';
import { GenericService } from '../services/generic.service';
import { ProductoCategoriaResumen } from '../model/productocategoriaresumen';


@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<Producto> {
  private productoChange: Subject<Producto[]> = new Subject<Producto[]>();
  private messageChange: Subject<string>=new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/producto`); 
  }

  setProductoChange(data: Producto[]) {
    this.productoChange.next(data);
  }

  getProductoChange() {
    return this.productoChange.asObservable();
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

  //para el layout contador
  getTotalProductos():Observable<number>{
    return this.http.get<number>(`${this.url}/conteo/total`);
  }

  obtenerResumenProductoPorCategoria(): Observable<ProductoCategoriaResumen[]> {
    return this.http.get<ProductoCategoriaResumen[]>(`${this.url}/resumen-por-categoria`);
  }

  findAllTitulo(titulo:string){
      return this.http.get<Producto[]>(`${environment.HOST}/api/producto/detalletitulo/${titulo}`)
    } 

}