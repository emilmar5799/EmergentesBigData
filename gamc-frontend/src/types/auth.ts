// Tipos de roles del sistema
export type UserRole = 
  | 'ALCALDE_GAMC' 
  | 'DIRECTOR_DGEYCI' 
  | 'ADMIN_SISTEMA' 
  | 'USUARIO';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
