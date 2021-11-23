import { Audit } from "./audit.model";

export interface Proyecto extends Audit {
    id: number;
    descripcion : string;
    activo : boolean;
}
export interface CreateProyectoDTO extends Omit<Proyecto, 'id'> {}
