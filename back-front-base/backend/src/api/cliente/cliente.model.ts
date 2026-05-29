import { Schema, model } from 'mongoose';
import { Cliente } from './cliente.entity';

const clienteSchema = new Schema<Cliente>(
  {
    nominativo: { type: String, required: true },

    via: { type: String, required: true },

    comune: { type: String, required: true },

    provincia: { type: String },

    telefono: { type: String },

    email: { type: String },

    note: { type: String }
  },
  {
    timestamps: true
  }
);

clienteSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete (ret as any)._id;
    delete (ret as any).__v;
    delete ret.id;
    return ret;
  }
});

export const ClienteModel = model<Cliente>('Cliente', clienteSchema);