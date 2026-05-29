import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientiService, Cliente } from '../../service/clienti.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModal } from '../../components/customer-modal/customer-modal';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {
  private clientiSrv = inject(ClientiService);
  private modalSrv = inject(NgbModal);

  customers: Cliente[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;

    this.clientiSrv.list().subscribe({
      next: (res) => {
        this.customers = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Errore caricamento clienti';
        this.loading = false;
      }
    });
  }

  // ➜ CREA
  openCreateModal() {
    const modal = this.modalSrv.open(CustomerModal, { centered: true });

    modal.result.then((data) => {
      if (!data) return;

      this.clientiSrv.create(data).subscribe(() => this.load());
    }).catch(() => {});
  }

  // ➜ MODIFICA
  openEditModal(customer: Cliente) {
    const modal = this.modalSrv.open(CustomerModal, { centered: true });

    modal.componentInstance.customer = customer;

    modal.result.then((data) => {
      if (!data) return;

      this.clientiSrv.update(customer._id!, data).subscribe(() => this.load());
    }).catch(() => {});
  }

  // ➜ DELETE
  delete(id: string) {
    if (!confirm('Sei sicuro di eliminare questo cliente?')) return;

    this.clientiSrv.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => this.error = err?.error?.message || 'Errore eliminazione'
    });
  }
}
