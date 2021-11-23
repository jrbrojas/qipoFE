import { Audit } from "./audit.model";

export interface Moneda extends Audit {
  idMoneda: string;
  descripcion: string;
}
