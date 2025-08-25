import { Ubigeo } from "./ubigeo";

export class Convocatoria {
    idConvocatoria: number; 
    numconvocatoria: string;
    objetivo: string;
    fregistro: Date;
    fregistrofinal: Date;
    urlbase: string; 
    urlresultadoinscripcion: string;
    urlresultadoconocimiento: string;
    urlresultadopsicologico: Date;
    urlresultadocurricular: number; 
    urlresultadoentrevista: string;
    urlresultadofinal: string;
    comunicados: string;
    tipo: number; 
    estado: number; 
    ubigeo: Ubigeo;
}