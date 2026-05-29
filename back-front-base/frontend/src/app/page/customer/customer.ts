import { Component, inject, OnInit } from '@angular/core';
import { ClientiService, Cliente } from '../../service/clienti.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, switchMap } from 'rxjs';
import { EditCustomerModal } from '../../add-request-modal/add-request-modal';


@Component({
  standalone: false,
  selector: 'app-customer',
  templateUrl: './customer.html',
  styleUrls: ['./customer.css']
})
export class Customer implements OnInit {

  private clientiSrv = inject(ClientiService);
  private modal = inject(NgbModal);

  private refresh$ = new BehaviorSubject<void>(undefined);

  customers$ = this.refresh$.pipe(
    switchMap(() => this.clientiSrv.list())
  );

  ngOnInit(): void {}

  load() {
    this.refresh$.next();
  }

  openAdd() {
    const modalRef = this.modal.open(EditCustomerModal);

    modalRef.componentInstance.cliente = {
      nominativo: '',
      via: '',
      comune: '',
      provincia: '',
      telefono: '',
      email: ''
    };

    modalRef.result.then((result: Cliente) => {
      this.clientiSrv.add(result).subscribe(() => this.load());
    }).catch(() => {});
  }

  openEdit(c: Cliente) {
    const modalRef = this.modal.open(EditCustomerModal);

    modalRef.componentInstance.cliente = { ...c };

    modalRef.result.then((updated: Cliente) => {

      this.clientiSrv.update(c._id!, updated)
        .subscribe(() => this.load());

    }).catch(() => {});
  }

  delete(id?: string) {
    if (!id) return;

    this.clientiSrv.delete(id).subscribe(() => {
      this.load();
    });
  }
}