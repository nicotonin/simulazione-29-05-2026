import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface Cliente {
  _id?: string;
  nominativo: string;
  via: string;
  comune: string;
  provincia: string;
  telefono?: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientiService {
  private http = inject(HttpClient);

  list() {
    return this.http.get<Cliente[]>(`${environment.apiUrl}/clienti`);
  }

  getById(id: string) {
    return this.http.get<Cliente>(`${environment.apiUrl}/clienti/${id}`);
  }

  create(cliente: Cliente) {
    return this.http.post<Cliente>(`${environment.apiUrl}/clienti`, cliente);
  }

  update(id: string, cliente: Cliente) {
    return this.http.put<Cliente>(`${environment.apiUrl}/clienti/${id}`, cliente);
  }

  delete(id: string) {
    return this.http.delete<void>(`${environment.apiUrl}/clienti/${id}`);
  }
}