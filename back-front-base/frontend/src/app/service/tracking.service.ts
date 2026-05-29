import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface TrackingResult {
  chiavediTracking: string;
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
  chiavediTracking: string;
  dataDiRitiro: string;
}) {
  return this.http.post<TrackingResult>(
    `${environment.apiUrl}/tracking`,
    data
  );
}
}