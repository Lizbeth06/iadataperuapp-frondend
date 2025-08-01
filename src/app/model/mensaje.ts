import { Persona } from "./persona";
import { Producto } from "./producto";

export class Mensaje {
  idMensaje:       number;
  asunto:          string; 
  descripcion:     string;
  tiporeunion:     number;
  fechaprogramado: Date;
  horainicio:      string;
  horafin:         string;
  fregistro:       Date;
  tipomensaje:     number;
  persona:         Persona;
  producto:        Producto;
}