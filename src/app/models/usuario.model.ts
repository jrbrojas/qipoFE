export interface User {
  id: number;
  user : string;
  password: string;
  correo: string;
  nombre: string;
  apellido : string;
  celular: string;
}

export interface CreateUserDTO extends Omit<User, 'id'> {}
  