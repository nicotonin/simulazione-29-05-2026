import { Schema, model } from 'mongoose';
import { Cliente } from '../cliente/cliente.entity';

export enum DeliveryStatus {
  DA_RITIRARE = 'Da ritirare',
  IN_DEPOSITO = 'In deposito',
  IN_CONSEGNA = 'In consegna',
  CONSEGNATA = 'Consegnata',
  IN_GIACENZA = 'In giacenza'
}

export interface Consegna {
  id?: string;
  chiavediTracking: string;
  dataDiRitiro: Date;
  DeliveryStatus: DeliveryStatus;
  dataDiConsegna?: Date | null;
  clienteID: string | Cliente;
}

const consegnaSchema = new Schema<Consegna>(
  {
    chiavediTracking: {
      type: String,
      required: true,
      unique: true
    },

    dataDiRitiro: {
      type: Date,
      required: true
    },

    DeliveryStatus: {
      type: String,
      required: true,
      default: DeliveryStatus.DA_RITIRARE,
      enum: Object.values(DeliveryStatus)
    },

    dataDiConsegna: {
      type: Date,
      default: null
    },

    clienteID: {
      type: Schema.Types.ObjectId,
      ref: 'Cliente',
      required: true
    }
  },
  {
    timestamps: true
  }
);

consegnaSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete (ret as any)._id;
    delete (ret as any).__v;
    delete ret.id;
    return ret;
  }
});

export const ConsegnaModel = model<Consegna>('Consegna', consegnaSchema);