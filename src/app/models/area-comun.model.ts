import { Audit } from "./audit.model";

export interface AreaComun extends Audit {
  id: number;
  idproyecto :number;
  nombre: string;
  descripcion: string;
  ruta: string;
}
  
export interface CreateAreaComunDTO extends Omit<AreaComun, 'id'> {}
  