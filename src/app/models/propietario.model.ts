import { Audit } from "./audit.model";

export interface Propietario extends Audit {
    id: number;
    dni :string;
    nombre: string;
    apellido : string;
    correo : string;
    celular : string;
    celularEmerg? : string;
    alquilado : boolean;
    placaUno : string;
    placaDos : string;
    mascota: string;
}
export interface CreatePropietarioDTO extends Omit<Propietario, 'id'> {}
