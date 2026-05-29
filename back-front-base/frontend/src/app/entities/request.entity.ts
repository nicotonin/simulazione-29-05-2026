import { User } from "./user.entity";
import { Category } from "../entities/category.entity";

export type Request = {
  id: string;
  dataInizio: Date;
  dataFine: Date;
  categoriaId: string;// FK categoria
  stato: 'In attesa' | 'Approvato' | 'Rifiutato';
  role1ID: User;// FK role1 (untente con meno accesso)
  role2ID?: User;// FK role2
  

}
