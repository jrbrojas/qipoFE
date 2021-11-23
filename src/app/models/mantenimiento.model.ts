import { Audit } from "./audit.model";

export interface Mantenimiento extends Audit {
    id: number;
    idproyecto : number;
    idCon: number;
    nombre: string;
    monto: number;
  }
  
export interface CreateMantenimientoDTO extends Omit<Mantenimiento, 'id'> {}
  