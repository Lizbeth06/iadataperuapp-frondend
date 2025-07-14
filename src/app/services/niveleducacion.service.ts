
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Niveleducacion } from '../model/niveleducacion';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class NiveleducacionService extends GenericService<Niveleducacion>{
  private niveleducacionChange: Subject<Niveleducacion[]> = new Subject<Niveleducacion[]>

  constructor(
    protected override http: HttpClient,
  ) { 
    super(
      http,
      `${environment.HOST}/api/niveleducacion`
    );
  }

  setNiveleducacionChange(data:Niveleducacion[]){
    this.niveleducacionChange.next(data);
  }

  getNiveleducacionChange(){
    return this.niveleducacionChange.asObservable();
  }
  
}