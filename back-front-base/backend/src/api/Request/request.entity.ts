import { User } from "../user/user.entity";

export interface Request1 {

  id?: string;

  dataInizio: Date;

  dataFine: Date;

  categoriaId: string;

  stato: "In attesa" | "Approvato" | "Rifiutato";

  role1ID: string | User;
  
  role2ID?: string | User;
}