import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { Criterio, Evaluacion } from '../model/evaluacion';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService extends GenericService<Evaluacion> {
  private evaluacionChange: Subject<Evaluacion[]> = new Subject<Evaluacion[]>();
  private messageChange: Subject<string>=new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/api/evaluaciontd`); 
  }

  setEvaluacionChange(data: Evaluacion[]) {
    this.evaluacionChange.next(data);
  }

  getEvaluacionChange() {
    return this.evaluacionChange.asObservable();
  }

  setMessageChange(data:string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }

  readonly criterios: Criterio[] = [
    // Gobernanza
    { id: 'g1', dimension: 'Gobernanza', texto: 'La empresa cuenta con una estrategia de transformación digital documentada.' },
    { id: 'g2', dimension: 'Gobernanza', texto: 'Existe liderazgo y patrocinio ejecutivo para iniciativas digitales.' },
    { id: 'g3', dimension: 'Gobernanza', texto: 'Se asigna presupuesto recurrente para proyectos de transformación digital.' },
    { id: 'g4', dimension: 'Gobernanza', texto: 'Se miden indicadores (KPIs) de avance digital.' },
    // Procesos
    { id: 'p1', dimension: 'Procesos', texto: 'Los procesos clave están digitalizados y documentados.' },
    { id: 'p2', dimension: 'Procesos', texto: 'Se aplican metodologías ágiles para mejorar procesos.' },
    { id: 'p3', dimension: 'Procesos', texto: 'Existe automatización de tareas repetitivas (RPA, scripts).' },
    { id: 'p4', dimension: 'Procesos', texto: 'La empresa integra sus procesos con clientes y proveedores digitalmente.' },
    // Datos
    { id: 'd1', dimension: 'Datos', texto: 'Los datos críticos están centralizados y accesibles.' },
    { id: 'd2', dimension: 'Datos', texto: 'Se aplican políticas de calidad y gobierno de datos.' },
    { id: 'd3', dimension: 'Datos', texto: 'Se utilizan herramientas de analítica/BI para tomar decisiones.' },
    { id: 'd4', dimension: 'Datos', texto: 'Existen iniciativas de inteligencia artificial o machine learning.' },
    // Tecnología
    { id: 't1', dimension: 'Tecnología', texto: 'La infraestructura tecnológica está actualizada (cloud, escalable).' },
    { id: 't2', dimension: 'Tecnología', texto: 'Las aplicaciones se integran mediante APIs.' },
    { id: 't3', dimension: 'Tecnología', texto: 'Se aplican prácticas de ciberseguridad (MFA, backups, monitoreo).' },
    { id: 't4', dimension: 'Tecnología', texto: 'Existe arquitectura tecnológica definida y mantenida.' },
    // Talento
    { id: 'tl1', dimension: 'Talento', texto: 'El personal recibe capacitación continua en habilidades digitales.' },
    { id: 'tl2', dimension: 'Talento', texto: 'Existe una cultura organizacional orientada a la innovación.' },
    { id: 'tl3', dimension: 'Talento', texto: 'Se cuenta con roles digitales especializados (data, dev, UX).' },
    { id: 'tl4', dimension: 'Talento', texto: 'Se promueve el cambio y adopción tecnológica entre los colaboradores.' },
  ];

  readonly evaluaciones = signal<Evaluacion[]>([]);
  private nextId = 1;

 

  nivelMadurez(prom: number): string {
    if (prom < 1.5) return 'Inicial';
    if (prom < 2.5) return 'Básico';
    if (prom < 3.5) return 'Intermedio';
    if (prom < 4.5) return 'Avanzado';
    return 'Líder';
  }

  registrar(ev: Omit<Evaluacion, 'id'>) {
    return this.http.post<Evaluacion>(`${this.url}`, ev);
  }

  listar() {
    return this.http.get<Evaluacion[]>(`${this.url}`);
  }

}