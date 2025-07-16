
import { Categoria } from "./categoria";
import { Habilidades } from "./habilidades";
import { Listadocente } from "./listadocente";
import { Listahorarios } from "./listahorarios";



export class Curso {
  idCurso:         number;
  titulo:          string;
  subtitulo:       string;
  fechaInicio:     Date;
  fechaFinal:      Date;
  duracionsemanas: number;
  duracionhoras:   number;
  modalidad:       number;
  cupos:           number;
  costo:           number;
  costoremate:     number;
  estado:          number;
  descripcion:     string;
  objetivo:     string;
  urlImagen:       string;
  urlprograma:       string;
  totalvisitas:       number;
  categoria:       Categoria;
  listadocente:    Listadocente[];
  listahorarios:   Listahorarios[];
  habilidades:     Habilidades[];
}