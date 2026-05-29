import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientiService, Cliente } from '../../service/clienti.service';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {
private clientiSrv = inject(ClientiService);
  private fb = inject(FormBuilder);

  customers: Cliente[] = [];
  selectedCustomer: Cliente | null = null;

  loading = false;
  error = '';

  form = this.fb.group({
    nome: ['', Validators.required],
    cognome: ['', Validators.required],
    email: ['', Validators.required],
    telefono: ['']
  });

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

  selectCustomer(c: Cliente) {
    this.selectedCustomer = c;
    this.form.patchValue(c);
  }

  create() {
    if (this.form.invalid) return;

    this.clientiSrv.create(this.form.value as Cliente).subscribe({
      next: () => {
        this.form.reset();
        this.load();
      }
    });
  }

  update() {
    if (!this.selectedCustomer) return;

    this.clientiSrv.update(
      this.selectedCustomer._id!,
      this.form.value as Cliente
    ).subscribe({
      next: () => {
        this.load();
      }
    });
  }

  delete(id: string) {
    this.clientiSrv.delete(id).subscribe({
      next: () => {
        this.load();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Errore eliminazione';
      }
    });
  }
}
