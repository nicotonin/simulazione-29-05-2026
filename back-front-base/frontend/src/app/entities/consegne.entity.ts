export enum DeliveryStatus {
  DA_RITIRARE = 'Da ritirare',
  IN_DEPOSITO = 'In deposito',
  IN_CONSEGNA = 'In consegna',
  CONSEGNATA = 'Consegnata',
  IN_GIACENZA = 'In giacenza'
}

export interface Consegna {
  _id?: string;
  chiavediTracking: string;
  dataDiRitiro: string;
  DeliveryStatus: DeliveryStatus;
  dataDiConsegna?: string | null;
  clienteID: string; // ObjectId dal backend
}