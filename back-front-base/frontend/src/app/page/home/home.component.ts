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
    chiavediTracking: ['', Validators.required],
    dataDiRitiro: ['', Validators.required]
  });

  track() {

    if (this.trackingForm.invalid) {

      this.trackingForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    this.trackingError = '';

    this.trackingResult = null;

    this.trackingSrv.track({
      chiavediTracking:
        this.trackingForm.value.chiavediTracking!,

      dataDiRitiro:
        this.trackingForm.value.dataDiRitiro!
    })
    .subscribe({

      next: (res) => {

        this.trackingResult = res;

        this.loading = false;
      },

      error: (err) => {

        console.error(err);

        this.loading = false;

        this.trackingError =
          err?.error?.message ||
          'Spedizione non trovata';
      }
    });
  }
  
}