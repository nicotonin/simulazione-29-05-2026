import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface TrackingResult {
  chiaveConsegna: string;
  stato: string;
  dataDiRitiro: string;
  dataDiConsegna?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private http = inject(HttpClient);

  track(data: {
  chiaveConsegna: string;
  dataRitiro: string;
}) {

  return this.http.post(
    `${environment.apiUrl}/tracking`,
    data
  );
}
}