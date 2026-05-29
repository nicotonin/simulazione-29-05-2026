import { Component, inject } from '@angular/core';
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { TrackingService } from '../../service/tracking.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  private fb = inject(FormBuilder);
  private trackingSrv = inject(TrackingService);

  loading = false;

  trackingError = '';

  trackingResult: any = null;

  trackingForm = this.fb.group({
    chiaveConsegna: ['', Validators.required],
    dataDiRitiro: ['null', Validators.required]
  });

  track() {

  if (this.trackingForm.invalid) {
    this.trackingForm.markAllAsTouched();
    return;
  }

  const rawDate = this.trackingForm.value.dataDiRitiro;
  const tracking = this.trackingForm.value.chiaveConsegna;

  if (!rawDate || !tracking) {
    this.trackingError = "Compila tutti i campi";
    return;
  }

  const parsedDate = new Date(rawDate);

  if (isNaN(parsedDate.getTime())) {
    this.trackingError = "Data non valida";
    return;
  }

  this.loading = true;
  this.trackingError = '';
  this.trackingResult = null;

  this.trackingSrv.track({
    chiaveConsegna: tracking,
    dataDiRitiro: parsedDate.toISOString()
  })
  .subscribe({
    next: (res) => {
      this.trackingResult = res;
      this.loading = false;
    },
    error: (err) => {
      console.log(err);
      this.loading = false;
      this.trackingError = err?.error?.message || 'Errore tracking';
    }
  });
}
  
}