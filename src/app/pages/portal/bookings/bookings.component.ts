import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, CalendarCheck, Clock, MapPin, Stethoscope, Eye, X, FileText, ChevronRight, Hash, Building2, CheckCircle2, AlertCircle, XCircle } from 'lucide-angular';

import { DataService } from '../../../core/services/data.service';
import { Booking } from '../../../core/models/hospital.model';

type TabKey = 'All' | 'Confirmed' | 'Pending' | 'Cancelled';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent {
  data = inject(DataService);
  readonly icons = { CalendarCheck, Clock, MapPin, Stethoscope, Eye, X, FileText, ChevronRight, Hash, Building2, CheckCircle2, AlertCircle, XCircle };

  filter = signal<TabKey>('All');

  filteredBookings = computed<Booking[]>(() => {
    const f = this.filter();
    if (f === 'All') return this.data.bookings();
    return this.data.bookings().filter(b => b.status === f);
  });

  tabs: { key: TabKey; label: string; icon: any }[] = [
    { key: 'All', label: 'All', icon: CalendarCheck },
    { key: 'Confirmed', label: 'Confirmed', icon: CheckCircle2 },
    { key: 'Pending', label: 'Pending', icon: AlertCircle },
    { key: 'Cancelled', label: 'Cancelled', icon: XCircle }
  ];

  countFor(key: TabKey): number {
    if (key === 'All') return this.data.bookings().length;
    return this.data.bookings().filter(b => b.status === key).length;
  }

  setFilter(f: TabKey) { this.filter.set(f); }

  cancelBooking(b: Booking, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.data.bookings.update(list =>
      list.map(x => x.id === b.id ? { ...x, status: 'Cancelled' as const } : x)
    );
  }
}
