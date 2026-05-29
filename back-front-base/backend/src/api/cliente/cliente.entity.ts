export interface Cliente {
  id?: string;
  nominativo: string;
  via: string;
  comune: string;
  provincia?: string;
  telefono?: string;
  email?: string;
  note?: string;
}