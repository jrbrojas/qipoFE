import { Audit } from "./audit.model";

export interface Proveedor extends Audit {
    id: number;
    idproyecto : number;
    idmoneda : string;
    ruc :string;
    contacto: string;
    razonSocial : string;
    celular : string;
    correo : string;
}
export interface CreateProveedorDTO extends Omit<Proveedor, 'id'> {}
