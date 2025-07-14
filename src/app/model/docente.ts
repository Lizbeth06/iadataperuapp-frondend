import { Trabajador } from "./trabajador";


export class Docente {
    idDocente?: number; 
    especializacion: string;
    trabajador: Trabajador | null; 
  }
