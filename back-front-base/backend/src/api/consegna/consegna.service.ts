import { ConsegnaModel, DeliveryStatus } from "./consegna.model";

class ConsegnaService {

  async lista(filtri: any) {

    const query: any = {};

    if (filtri.clienteID) {
      query.clienteID = filtri.clienteID;
    }

    if (filtri.DeliveryStatus) {
      query.DeliveryStatus = filtri.DeliveryStatus;
    }

    return await ConsegnaModel.find(query)
      .populate("clienteID");
  }

  async dettaglio(id: string) {
    return await ConsegnaModel.findById(id)
      .populate("clienteID");
  }

  async crea(data: any) {

    const esiste = await ConsegnaModel.findOne({
      chiavediTracking: data.chiavediTracking
    });

    if (esiste) {
      throw new Error("Chiave tracking già esistente");
    }

    return await ConsegnaModel.create({
      ...data,
      dataDiRitiro: new Date(data.dataDiRitiro),
      DeliveryStatus: DeliveryStatus.DA_RITIRARE
    });
  }

  async modifica(id: string, data: any) {
    return await ConsegnaModel.findByIdAndUpdate(id, data, { new: true });
  }

  async elimina(id: string) {

    const consegna = await ConsegnaModel.findById(id);

    if (!consegna) throw new Error("Consegna non trovata");

    if (consegna.DeliveryStatus === DeliveryStatus.CONSEGNATA) {
      throw new Error("Non puoi eliminare una consegna già consegnata");
    }

    return await ConsegnaModel.findByIdAndDelete(id);
  }

  async aggiornaStato(id: string, stato: DeliveryStatus) {

    const consegna = await ConsegnaModel.findById(id);

    if (!consegna) throw new Error("Consegna non trovata");

    const update: any = {
      DeliveryStatus: stato
    };

    if (stato === DeliveryStatus.CONSEGNATA) {
      update.dataDiConsegna = new Date();
    }

    return await ConsegnaModel.findByIdAndUpdate(id, update, { new: true });
  }
}

export default new ConsegnaService();