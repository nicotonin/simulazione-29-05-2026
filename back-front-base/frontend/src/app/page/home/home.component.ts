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
    dataRitiro: ['', Validators.required]
  });

  track() {

  if (this.trackingForm.invalid) {
    this.trackingForm.markAllAsTouched();
    return;
  }

  const rawDate = this.trackingForm.value.dataRitiro;
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

  console.log('👉 FORM RAW:', this.trackingForm.value);
  console.log('👉 PAYLOAD FINAL:', {
    chiaveConsegna: tracking,
    dataRitiro: parsedDate.toISOString()
  });
  
  this.loading = true;
  this.trackingError = '';
  this.trackingResult = null;

  this.trackingSrv.track({
    chiaveConsegna: tracking,
    dataRitiro: parsedDate.toISOString()
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