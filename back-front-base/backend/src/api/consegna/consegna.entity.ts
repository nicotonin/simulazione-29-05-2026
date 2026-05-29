import { User } from "../user/user.entity";

export interface Category {
    id?: string;
    chiavediTracking: string;
    dataDiRitiro: Date;
    DeliveryStatus: string;
    dataDiConsegna?: Date;
    clienteID: string | User;
  }
  
  