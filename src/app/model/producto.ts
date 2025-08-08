import { Categoria } from "./categoria";
import { Listabeneficiosproducto } from "./listabeneficiosproducto";
import { Listadetalleproducto } from "./listadetalleproducto";
import { Tipoproducto } from "./tipoproducto";

export class Producto {
  idProducto: number; 
  titulo: string;
  descripcion: string;
  costoSoles: number;
  costoDolar: number;
  costoAnteriorSoles: number; 
  costoAnteriorDolar: number; 
  cantidad: number;
  codigo: string;
  tipoproducto: Tipoproducto | null; 
  categoria: Categoria;
  urlImagen: string;
  urlImagen2: string;
  urlImagen3: string;
  urlyoutuve: string;
  garantia: number;
  estadoProducto: number;
  fechacreacion: Date; 
  urlDireccionWeb: string; 
 totalvisitas:number;
  listabeneficiosproducto:    Listabeneficiosproducto[];
  listadetalleproducto:    Listadetalleproducto[];
}