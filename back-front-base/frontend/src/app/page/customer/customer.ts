import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientiService, Cliente } from '../../service/clienti.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerModal } from '../../components/customer-modal/customer-modal';
import { BehaviorSubject, switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {
      private clientiSrv = inject(ClientiService);
  private modalService = inject(NgbModal);

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
      error: (err) => {
        console.log(err);
        this.error = 'Errore caricamento clienti';
        this.loading = false;
      }
    });
  }

  // ---------------- CREATE ----------------
  openCreate() {
    const modalRef = this.modalService.open(CustomerModal);

    modalRef.componentInstance.customer = null;

    modalRef.result.then((result: Cliente) => {
      this.clientiSrv.create(result).subscribe(() => this.load());
    }).catch(() => {});
  }

  // ---------------- EDIT ----------------
  openEdit(c: Cliente) {
    const modalRef = this.modalService.open(CustomerModal);

    modalRef.componentInstance.customer = c;

    modalRef.result.then((result: Cliente) => {
      this.clientiSrv.update(c._id!, result).subscribe(() => this.load());
    }).catch(() => {});
  }

  // ---------------- DELETE ----------------
  delete(id?: string) {
    if (!id) {
      console.log('ID mancante');
      return;
    }

    if (!confirm('Eliminare cliente?')) return;

    this.clientiSrv.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => console.log(err)
    });
  }
}
