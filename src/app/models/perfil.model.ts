import { Audit } from "./audit.model";

export interface Perfil extends Audit {
    id: number;
    descripcion: string;
    activo : boolean;
}
