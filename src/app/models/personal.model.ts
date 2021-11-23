import { Audit } from "./audit.model";

export interface Personal extends Audit {
    id: number;
    idproyecto : number;
    idmoneda :string;
    idCon : number;
    nombre: string;
    apellido : string;
    actividad : string;
    celular : string;
    sueldo : number;
}
export interface CreatePersonalDTO extends Omit<Personal, 'id'> {}