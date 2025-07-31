import { Modulosproducto } from "./modulosproducto";
import { Producto } from "./producto";

export class Listadetalleproducto {
  idListadetalleproducto: number;
  descripcion: string;
  producto: Producto;
  modulosproducto: Modulosproducto;
}