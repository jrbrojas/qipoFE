export interface Servicio {
    id: number;
    idproyecto : number;
    nidCon: number;
    nombre: string;
    monto: number;
    usuario: number;
  }
  
export interface CreateServicioDTO extends Omit<Servicio, 'id'> {}
  