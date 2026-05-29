import { ConsegnaModel } from "../consegna/consegna.model";


class TrackingService {

    async traccia(chiaveConsegna: string, dataRitiro: string) {

        const consegna = await ConsegnaModel.findOne({
            chiavediTracking: chiaveConsegna,
            dataDiRitiro: new Date(dataRitiro)
        });

        if (!consegna) {
            throw new Error("Consegna non trovata");
        }

        return {
            stato: consegna.DeliveryStatus,
            dataRitiro: consegna.dataDiRitiro,
            dataConsegna: consegna.dataDiConsegna || null
        };
    }
}

export default new TrackingService();