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

  console.log('CLICK OK');

  this.trackingSrv.track({
    chiaveConsegna: 'TRK-002',
    dataRitiro: '2026-05-29T00:00:00.000Z'
  }).subscribe({
    next: res => console.log('OK RESPONSE', res),
    error: err => console.log('ERROR RESPONSE', err)
  });

}
  
}