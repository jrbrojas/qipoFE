import { Audit } from "./audit.model";

export interface Consolidado extends Audit{
  id: number;
  periodo: string;
  monto :number;
  fechaRegis : Date;
  ruta : string;
  estado : string;
}
  
export interface CreateConsolidadoDTO extends Omit<Consolidado, 'id'> {}
  