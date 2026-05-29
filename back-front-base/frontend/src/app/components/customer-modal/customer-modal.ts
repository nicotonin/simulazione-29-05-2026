import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../../service/clienti.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-modal',
  standalone: false,
  templateUrl: './customer-modal.html',
  styleUrl: './customer-modal.css',
})
export class CustomerModal {
     activeModal = inject(NgbActiveModal);

  @Input() customer: Cliente | null = null;

  ngOnInit() {
    this.customer = this.customer
      ? { ...this.customer }
      : {
          nominativo: '',
          via: '',
          comune: '',
          provincia: '',
          email: '',
          telefono: ''
        };
  }

  save() {
    if (!this.isValid()) return;
    this.activeModal.close(this.customer);
  }

  cancel() {
    this.activeModal.dismiss();
  }

  isValid(): boolean {
    return !!(
      this.customer?.nominativo &&
      this.customer?.via &&
      this.customer?.comune &&
      this.customer?.provincia &&
      this.customer?.email
    );
  }
}
