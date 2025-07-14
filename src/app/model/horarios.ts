import { Diassemana } from "./diassemana";


export interface Horarios {
  idHorarios: number;
  diassemana: Diassemana; 
  horaInicio: Date;
  horaFinal: Date;
  estado: number;
}

