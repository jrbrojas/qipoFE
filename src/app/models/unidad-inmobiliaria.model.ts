import { Audit } from "./audit.model";

export interface UnidadInmobiliaria extends Audit{
    id: number;
    idproyecto : number;
    ui: string;
    tipo: string;
    subtipo: string;
    grupo: string;
    unidad: string;
    areaTechada: string;
    areaOcupada: string;
    alicuota : number;
}
  
export interface CreateUnidadInmobiliariaDTO extends Omit<UnidadInmobiliaria, 'id'> {}
  