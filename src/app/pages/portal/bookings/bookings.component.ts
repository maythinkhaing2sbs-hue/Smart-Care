import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, CalendarCheck, Clock, MapPin, Stethoscope, Eye, X, FileText } from 'lucide-angular';

import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent {
  data = inject(DataService);
  readonly icons = { CalendarCheck, Clock, MapPin, Stethoscope, Eye, X, FileText };

  filter = signal<'Upcoming' | 'Completed' | 'Cancelled'>('Upcoming');

  filteredBookings = computed(() => {
    const f = this.filter();
    return this.data.bookings().filter(b => {
      if (f === 'Upcoming') return b.status === 'Confirmed' || b.status === 'Pending';
      if (f === 'Completed') return b.status === 'Completed';
      return b.status === 'Cancelled';
    });
  });

  setFilter(f: 'Upcoming' | 'Completed' | 'Cancelled') { this.filter.set(f); }
}
