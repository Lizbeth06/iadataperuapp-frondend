


export interface Empresa {
  ruc?: string;
  razonSocial?: string;
  nombreComercial?: string;
  direccion?: string;
  departamento?: string;
  provincia?: string;
  distrito?: string;
  estado?: string;
  condicion?: string;
  sede?: string;
}

export interface Criterio {
  id: string;
  dimension: string;
  texto: string;
}

export interface Evaluacion {
  idEvaluaciontd?: number;
  ruc?: string;
  razonSocial?: string;
  direccion?: string;
  sede?: string;
  fecha?: string;
  promedioGlobal?: number;
  nivel?: string;
  puntajes?: string;
  porDimension?: string;
}
