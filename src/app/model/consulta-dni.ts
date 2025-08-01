export interface ConsultaDni {
    success: boolean;
    dni: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    codVerifica: number;
    codVerificaLetra: string;
}

export interface ConsultaDniError {
    success: boolean;
    message: string
}