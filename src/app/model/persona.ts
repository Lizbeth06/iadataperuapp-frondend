
import { Tipodocumento } from "./tipodocumento";
import { Ubigeo } from "./ubigeo";

export class Persona {
  idPersona: number;
  numDocumento: string;
  nombres: string;
  apaterno: string;
  amaterno: string;
  genero: number;
  correo: string;
  telefono: string;
  direccion: string;
  urllinkeding: string;
  fnacimiento: Date | string;
  tipodocumento: Tipodocumento; 
  ubigeo: Ubigeo|null;
}