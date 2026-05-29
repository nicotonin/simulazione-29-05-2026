import { ConsegnaModel,DeliveryStatus } from "../consegna/consegna.model";

class StatisticheService {

    async consegne(dal?: string, al?: string, stato?: string) {

        const query: any = {};

        // filtro stato
        if (stato) {
            query.DeliveryStatus = stato;
        }

        // filtro date
        if (dal || al) {
            query.dataDiRitiro = {};
            if (dal) query.dataDiRitiro.$gte = new Date(dal);
            if (al) query.dataDiRitiro.$lte = new Date(al);
        }

        const consegne = await ConsegnaModel.find(query);

        const numeroConsegne = consegne.length;

        // 🔥 tempo medio SOLO consegnate
        const consegneCompletate = consegne.filter(
            c => c.DeliveryStatus === DeliveryStatus.CONSEGNATA && c.dataDiConsegna
        );

        let tempoMedioConsegnaOre = 0;

        if (consegneCompletate.length > 0) {

            const totaleOre = consegneCompletate.reduce((acc, c) => {

                const diff = new Date(c.dataDiConsegna!).getTime()
                    - new Date(c.dataDiRitiro).getTime();

                const ore = diff / (1000 * 60 * 60);

                return acc + ore;

            }, 0);

            tempoMedioConsegnaOre = totaleOre / consegneCompletate.length;
        }

        return {
            dal: dal || null,
            al: al || null,
            stato: stato || null,
            numeroConsegne,
            tempoMedioConsegnaOre: Number(tempoMedioConsegnaOre.toFixed(2))
        };
    }
}

export default new StatisticheService();