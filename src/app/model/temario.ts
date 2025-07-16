import { Curso } from "./curso";

export interface Temario {
    idTemario?:number;
    titulo:string;
    resumen:string;
    estado:number;
    urlVideo:string;
    urlImagen:string;
    urlArchivos:string;
    contenido:string;
    curso:Curso;
}