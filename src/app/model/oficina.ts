import { Tipooficina } from "./tipooficina";



export interface Oficina {
    idOficina?:number;
    descripcion:string;
    tipooficina: Tipooficina|null;

}