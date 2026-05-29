import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../service/clienti.service';

@Component({
  selector: 'app-customer-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `

    <div class="modal-header">
      <h4 class="modal-title">
        {{ cliente._id ? 'Modifica cliente' : 'Nuovo cliente' }}
      </h4>
    </div>

    <div class="modal-body">

      <input class="form-control mb-2"
             placeholder="Nominativo"
             [(ngModel)]="cliente.nominativo">

      <input class="form-control mb-2"
             placeholder="Via"
             [(ngModel)]="cliente.via">

      <input class="form-control mb-2"
             placeholder="Comune"
             [(ngModel)]="cliente.comune">

      <input class="form-control mb-2"
             placeholder="Provincia"
             [(ngModel)]="cliente.provincia">

      <input class="form-control mb-2"
             placeholder="Email"
             [(ngModel)]="cliente.email">

      <input class="form-control mb-2"
             placeholder="Telefono"
             [(ngModel)]="cliente.telefono">

    </div>

    <div class="modal-footer">

      <button class="btn btn-secondary"
              (click)="cancel()">
        Annulla
      </button>

      <button class="btn btn-primary"
              (click)="save()"
              [disabled]="!isValid()">
        Salva
      </button>

    </div>
  `
})
export class CustomerModal {

  activeModal = inject(NgbActiveModal);

  cliente: Cliente = {
    nominativo: '',
    via: '',
    comune: '',
    provincia: '',
    email: '',
    telefono: ''
  };

  cancel() {
    this.activeModal.dismiss();
  }

  isValid(): boolean {
    return !!this.cliente.nominativo && !!this.cliente.email;
  }

  save() {
    this.activeModal.close(this.cliente);
  }
}