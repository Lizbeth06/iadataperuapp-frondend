export class Categoria {
    idCategoria: number; 
    nombre: string;
    descripcion: string;
    fechaCreada: Date;
  }
  
export interface ListaCategoriasxcurso {
    hasSucceeded: boolean;
    statusCode:   number;
    value:        Listacursos[];
}

export interface Listacursos {
    nombre:    string;
    cupos:     number;
    titulo:    string;
    modalidad: number;
    id_curso:  number;
    costo:     number;
}