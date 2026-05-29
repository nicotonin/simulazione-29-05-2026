import { ConsegnaModel } from "../consegna/consegna.model";
import { ClienteModel } from "./cliente.model";


class ClienteService {

  // 📌 LISTA CLIENTI
  async lista() {
    return await ClienteModel.find();
  }

  // 📌 DETTAGLIO CLIENTE
  async dettaglio(id: string) {
    return await ClienteModel.findById(id);
  }

  // 📌 CREA CLIENTE
  async crea(data: any) {
    return await ClienteModel.create(data);
  }

  // 📌 MODIFICA CLIENTE
  async modifica(id: string, data: any) {
    return await ClienteModel.findByIdAndUpdate(id, data, { new: true });
  }

  // 📌 ELIMINA CLIENTE (REGOLA ESAME)
  async elimina(id: string) {

    // controllo consegne collegate
    const consegneCollegate = await ConsegnaModel.findOne({
      clienteID: id
    });

    if (consegneCollegate) {
      throw new Error(
        "Impossibile eliminare il cliente: esistono consegne collegate"
      );
    }

    return await ClienteModel.findByIdAndDelete(id);
  }
}

export default new ClienteService();