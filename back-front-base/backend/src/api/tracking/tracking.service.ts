import { ConsegnaModel } from "../consegna/consegna.model";

class TrackingService {

  async traccia(chiaveConsegna: string, dataRitiro: string) {

    // 🔥 VALIDAZIONE INPUT
    if (!chiaveConsegna) {
      throw new Error("Chiave di tracking mancante");
    }

    if (!dataRitiro) {
      throw new Error("Data di ritiro mancante");
    }

    const date = new Date(dataRitiro);

    if (isNaN(date.getTime())) {
      throw new Error("Data di ritiro non valida");
    }

    // 🔥 NORMALIZZO GIORNO (IMPORTANTISSIMO)
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // 🔥 QUERY CORRETTA
    const consegna = await ConsegnaModel.findOne({
      chiavediTracking: chiaveConsegna,
      dataDiRitiro: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (!consegna) {
      throw new Error("Consegna non trovata");
    }

    return {
      chiavediTracking: consegna.chiavediTracking,
      stato: consegna.DeliveryStatus,
      dataRitiro: consegna.dataDiRitiro,
      dataConsegna: consegna.dataDiConsegna || null
    };
  }
}

export default new TrackingService();