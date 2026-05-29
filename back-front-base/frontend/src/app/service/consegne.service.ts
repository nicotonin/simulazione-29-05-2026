import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
  clienteID: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsegneService {
  private http = inject(HttpClient);

  list() {
    return this.http.get<Consegna[]>(`${environment.apiUrl}/consegne`);
  }

  getById(id: string) {
    return this.http.get<Consegna>(`${environment.apiUrl}/consegne/${id}`);
  }

  create(consegna: Consegna) {
    return this.http.post<Consegna>(`${environment.apiUrl}/consegne`, consegna);
  }

  update(id: string, consegna: Consegna) {
    return this.http.put<Consegna>(`${environment.apiUrl}/consegne/${id}`, consegna);
  }

  delete(id: string) {
    return this.http.delete<void>(`${environment.apiUrl}/consegne/${id}`);
  }

  updateStatus(id: string, stato: DeliveryStatus) {
    return this.http.put<Consegna>(
      `${environment.apiUrl}/consegne/${id}/stato`,
      { DeliveryStatus: stato }
    );
  }
}