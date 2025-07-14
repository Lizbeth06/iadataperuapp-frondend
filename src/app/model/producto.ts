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
  urlImagen: string;
  garantia: number;
  estadoProducto: number;
  urlDireccionWeb: string; 
}