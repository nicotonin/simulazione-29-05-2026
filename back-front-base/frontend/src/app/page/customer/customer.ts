import { Component, inject } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ClientiService, Cliente } from '../../service/clienti.service';
import { CustomerModal } from '../../add-request-modal/add-request-modal';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.html',
  styleUrls: ['./customer.css']
})
export class Customer {

  private clientiSrv = inject(ClientiService);
  private modal = inject(NgbModal);

  private refresh$ = new BehaviorSubject<void>(undefined);

  customers$ = this.refresh$.pipe(
    switchMap(() => this.clientiSrv.list())
  );

  load() {
    this.refresh$.next();
  }

  // ✅ CREATE
  openAdd() {
    const modalRef = this.modal.open(CustomerModal);

    modalRef.componentInstance.cliente = {
      nominativo: '',
      via: '',
      comune: '',
      provincia: '',
      email: '',
      telefono: ''
    };

    modalRef.result.then((result: Cliente) => {
      this.clientiSrv.add(result).subscribe(() => this.load());
    }).catch(() => {});
  }

  // ✅ EDIT
  openEdit(c: Cliente) {
    const modalRef = this.modal.open(CustomerModal);

    modalRef.componentInstance.cliente = { ...c };

    modalRef.result.then((result: Cliente) => {

      if (!c._id) return;

      this.clientiSrv.update(c._id, result)
        .subscribe(() => this.load());

    }).catch(() => {});
  }

  // ✅ DELETE
  delete(_id?: string) {
    if (!_id) return;

    this.clientiSrv.delete(_id)
      .subscribe(() => this.load());
  }
}