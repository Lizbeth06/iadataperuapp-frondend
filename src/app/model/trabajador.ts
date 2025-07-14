
import { Niveleducacion } from "./niveleducacion";
import { Oficina } from "./oficina";
import { Persona } from "./persona";

 
export class Trabajador {
    idTrabajador:   number;
    codigoTrabajador:string;
    cargo:          string;
    fingreso:       Date;
    fsalida:        Date;
    tipocontrato:   string;
    horariotrabajo: string;
    salario:        number;
    metas:          string;
    observaciones:  string;
    bonificaciones: number;
    linkedin:       string;
    urlFoto:       string;
    persona:       Persona;
    niveleducacion: Niveleducacion;
    oficina:       Oficina;
}