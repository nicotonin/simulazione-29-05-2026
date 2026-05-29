import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../../service/clienti.service';

@Component({
  selector: 'app-customer-modal',
  standalone: false,
  templateUrl: './customer-modal.html',
  styleUrl: './customer-modal.css',
})
export class CustomerModal {
  activeModal = inject(NgbActiveModal);

  customer: Cliente = {
    nome: '',
    cognome: '',
    email: '',
    telefono: ''
  };

  ngOnInit() {}

  isValid(): boolean {
    return !!this.customer.nome && !!this.customer.cognome && !!this.customer.email;
  }

  save() {
    if (!this.isValid()) return;

    this.activeModal.close(this.customer);
  }

  cancel() {
    this.activeModal.dismiss();
  }

}
