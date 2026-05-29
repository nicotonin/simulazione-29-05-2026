import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-add-request-modal',
  standalone: true,
  styleUrls: ['./add-request-modal.component.css'],
  imports: [CommonModule, FormsModule],
  template: `

    <div class="modal-header">
      <h4 class="modal-title">Aggiungi richiesta</h4>
    </div>

    <div class="modal-body">

      <!-- DATA INIZIO -->
      <div class="mb-3">
        <label class="form-label">Data inizio</label>
        <input
          type="date"
          class="form-control"
          [(ngModel)]="dataInizio"
          (ngModelChange)="onStartDateChange()"
          [max]="dataFine || null">
      </div>

      <!-- DATA FINE -->
      <div class="mb-3">
        <label class="form-label">Data fine</label>
        <input
          type="date"
          class="form-control"
          [(ngModel)]="dataFine"
          (ngModelChange)="validateDates()"
          [min]="dataInizio || null">
      </div>

      <!-- ERRORE -->
      <div *ngIf="dateError" class="alert alert-danger py-1">
        ⚠ La data di fine non può essere precedente alla data di inizio
      </div>

      <!-- CATEGORIA -->
      <div class="mb-3">
        <label class="form-label">Categoria</label>

        <select class="form-control" [(ngModel)]="categoriaId">
          <option value="">-- Seleziona categoria --</option>

          <option *ngFor="let c of categories" [value]="c.categoriaId">
            {{ c.description }}
          </option>

        </select>
      </div>

    </div>

    <div class="modal-footer">

      <button
        type="button"
        class="btn btn-secondary"
        (click)="activeModal.dismiss()">

        Annulla
      </button>

      <button
        type="button"
        class="btn btn-primary"
        (click)="add()"
        [disabled]="!isValid()">

        Conferma
      </button>

    </div>
  `
})
export class AddRequestModal implements OnInit {

  activeModal = inject(NgbActiveModal);
  categorySrv = inject(CategoryService);

  dataInizio = '';
  dataFine = '';
  categoriaId = '';

  categories: any[] = [];

  dateError = false;

  ngOnInit() {

    this.categorySrv.list().subscribe(res => {
      this.categories = res;
    });

    this.dataInizio = this.formatDate(this.dataInizio);
    this.dataFine = this.formatDate(this.dataFine);

    this.validateDates();
  }

  // quando cambia data inizio aggiorniamo anche validazione
  onStartDateChange() {
    if (this.dataFine && this.dataFine < this.dataInizio) {
      this.dataFine = '';
    }
    this.validateDates();
  }

  validateDates() {
    if (!this.dataInizio || !this.dataFine) {
      this.dateError = false;
      return;
    }

    this.dateError =
      new Date(this.dataFine) < new Date(this.dataInizio);
  }

  isValid(): boolean {
    return (
      !!this.dataInizio &&
      !!this.dataFine &&
      !!this.categoriaId &&
      !this.dateError
    );
  }

  private formatDate(value: string): string {
    if (!value) return '';
    return value.includes('T') ? value.split('T')[0] : value;
  }

  add() {
    if (!this.isValid()) return;

    this.activeModal.close({
      dataInizio: this.dataInizio,
      dataFine: this.dataFine,
      categoriaId: this.categoriaId
    });
  }
}