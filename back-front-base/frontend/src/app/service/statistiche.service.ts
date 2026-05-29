import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface StatisticheConsegne {
  dal: string | null;
  al: string | null;
  stato: string | null;
  numeroConsegne: number;
  tempoMedioConsegnaOre: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticheService {
  private http = inject(HttpClient);

  getConsegneStats(params?: {
    dal?: string;
    al?: string;
    stato?: string;
  }) {
    return this.http.get<StatisticheConsegne>(
      `${environment.apiUrl}/statistiche/consegne`,
      { params: params as any }
    );
  }
}