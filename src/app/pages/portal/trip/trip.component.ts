import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plane, Car, MapPin, Calendar, Clock, Save, AlertCircle, CheckCircle2, Hourglass, Stethoscope, Hotel, Bell, ArrowRight, History, MoreHorizontal, ChevronRight } from 'lucide-angular';

import { DataService } from '../../../core/services/data.service';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  expired: boolean;
}

type Urgency = 'normal' | 'warning' | 'critical' | 'expired';
type Mode = 'Car' | 'Flight';

interface TripHistoryItem {
  id: string;
  destination: string;
  origin: string;
  date: string;
  returnDate: string;
  hospital: string;
  status: 'Completed' | 'Cancelled';
  mode: Mode;
}

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss'
})
export class TripComponent implements OnInit, OnDestroy {
  data = inject(DataService);

  readonly icons = { Plane, Car, MapPin, Calendar, Clock, Save, AlertCircle, CheckCircle2, Hourglass, Stethoscope, Hotel, Bell, ArrowRight, History, MoreHorizontal, ChevronRight };

  // ---------- Form state ----------
  fromLocation = signal(this.data.trip().origin);
  toLocation = signal(this.data.trip().destination);
  date = signal(this.data.trip().startDate);
  time = signal('15:00');
  travelMode = signal<Mode>('Flight');
  saved = signal(false);
  /**
   * Reminder card visibility. Becomes true once the form has all required
   * trip data. Initialized true because the form is preloaded with the
   * user's active trip; clearing any field hides the card again.
   */
  tripSaved = signal(true);

  // ---------- Countdown ----------
  countdown = signal<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0, expired: false });
  private timerId?: ReturnType<typeof setInterval>;

  urgency = computed<Urgency>(() => {
    const c = this.countdown();
    if (c.expired) return 'expired';
    if (c.total < 24 * 60 * 60 * 1000) return 'critical';
    if (c.total < 7 * 24 * 60 * 60 * 1000) return 'warning';
    return 'normal';
  });

  urgencyMessage = computed(() => {
    switch (this.urgency()) {
      case 'critical': return 'Departure within 24 hours — final preparations';
      case 'warning': return 'Departure approaching — finalize preparations';
      case 'expired': return 'Trip date has passed';
      default: return 'On schedule — your trip is upcoming';
    }
  });

  // ---------- Stats / Progress for hero ----------
  private readonly bookedAt = new Date('2026-04-15');
  bookedOnLabel = signal('Apr 15, 2026');

  tripDuration = computed(() => {
    const start = new Date(this.date());
    const end = new Date(this.data.trip().endDate);
    const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return isNaN(diff) ? 0 : Math.max(0, diff);
  });

  destinationTz = computed(() => {
    const dest = this.toLocation().toLowerCase();
    if (dest.includes('usa')) return 'EST · UTC−5';
    if (dest.includes('thailand') || dest.includes('singapore')) return 'ICT · UTC+7';
    if (dest.includes('india')) return 'IST · UTC+5:30';
    if (dest.includes('turkey')) return 'TRT · UTC+3';
    return 'Local · UTC+0';
  });

  progressPercent = computed(() => {
    const target = new Date(`${this.date()}T${this.time() || '00:00'}:00`).getTime();
    const totalWindow = target - this.bookedAt.getTime();
    if (totalWindow <= 0) return 100;
    const elapsed = Date.now() - this.bookedAt.getTime();
    const pct = Math.max(0, Math.min(100, (elapsed / totalWindow) * 100));
    return Math.round(pct);
  });

  // ---------- Trip History ----------
  tripHistory: TripHistoryItem[] = [
    { id: 'TR-2403', destination: 'Bangkok, Thailand', origin: 'Yangon, Myanmar', date: '2025-11-12', returnDate: '2025-11-25', hospital: 'Bumrungrad International', status: 'Completed', mode: 'Flight' },
    { id: 'TR-2351', destination: 'Mumbai, India', origin: 'Yangon, Myanmar', date: '2025-08-04', returnDate: '2025-08-15', hospital: 'Apollo Hospitals', status: 'Completed', mode: 'Flight' },
    { id: 'TR-2298', destination: 'Singapore', origin: 'Yangon, Myanmar', date: '2025-04-20', returnDate: '2025-04-28', hospital: 'Mount Elizabeth', status: 'Cancelled', mode: 'Flight' },
    { id: 'TR-2240', destination: 'Penang, Malaysia', origin: 'Yangon, Myanmar', date: '2024-12-10', returnDate: '2024-12-22', hospital: 'Gleneagles Penang', status: 'Completed', mode: 'Flight' }
  ];

  ngOnInit(): void {
    this.tick();
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) clearInterval(this.timerId);
  }

  private tick(): void {
    const dateStr = this.date();
    const timeStr = this.time() || '00:00';
    const target = new Date(`${dateStr}T${timeStr}:00`).getTime();
    const total = target - Date.now();

    if (isNaN(target) || total <= 0) {
      this.countdown.set({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0, expired: true });
      return;
    }

    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / (1000 * 60)) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    this.countdown.set({ days, hours, minutes, seconds, total, expired: false });
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  setMode(m: Mode): void {
    this.travelMode.set(m);
  }

  saveTrip(): void {
    if (!this.fromLocation().trim() || !this.toLocation().trim() || !this.date() || !this.time()) {
      return;
    }
    this.tick();
    this.tripSaved.set(true);
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2400);
  }
}
