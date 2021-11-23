import { Audit } from "./audit.model";

export interface Agua extends Audit{
  id: number;
  idui: number;
  lecturaAntes :number;
  lecturaActual : number;
  consumo : number;
  montoRecib : number;
}
  
export interface CreateAguaDTO extends Omit<Agua, 'id'> {}
  