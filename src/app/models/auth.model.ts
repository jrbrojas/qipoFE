export interface Auth {
    access_token: string;
}

export interface Login{
    usuario : string,
    clave   : string
}

export interface DataApp{
    idProyecto? : number;
    proyecto?: string;
    idMoneda?: number;
    moneda?: string;
}