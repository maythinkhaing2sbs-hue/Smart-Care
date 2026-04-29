import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, MapPin, Star, Heart, ArrowLeft, ChevronLeft, ChevronRight, Wifi, Car, Coffee, Pill, Activity, Stethoscope, MessageSquare, ImageIcon, Building, Clock, CalendarCheck, CheckCircle2, X, Send, Phone, Mail, Globe, ShieldCheck, Users, Bed, Calendar, Share2, Navigation } from 'lucide-angular';

import { DataService } from '../../../core/services/data.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking, Review } from '../../../core/models/hospital.model';

type Tab = 'Overview' | 'Reviews' | 'Gallery';

@Component({
  selector: 'app-hospital-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './hospital-detail.component.html',
  styleUrl: './hospital-detail.component.scss'
})
export class HospitalDetailComponent {
  data = inject(DataService);
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly icons = { MapPin, Star, Heart, ArrowLeft, ChevronLeft, ChevronRight, Wifi, Car, Coffee, Pill, Activity, Stethoscope, MessageSquare, ImageIcon, Building, Clock, CalendarCheck, CheckCircle2, X, Send, Phone, Mail, Globe, ShieldCheck, Users, Bed, Calendar, Share2, Navigation };

  hospital = computed(() => {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    return this.data.getHospital(id);
  });

  tab = signal<Tab>('Overview');
  tabs: Tab[] = ['Overview', 'Reviews', 'Gallery'];

  // Booking — date only
  selectedDate = signal<string>('');
  showSuccess = signal(false);
  successBooking = signal<Booking | null>(null);

  monthName = 'May 2026';
  daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  weekHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // For visual calendar (May 2026 starts on Friday)
  calendarOffset = 5;

  // Review form
  showReviewForm = signal(false);
  reviewRating = signal(0);
  reviewHover = signal(0);
  reviewComment = signal('');
  reviewError = signal<string | null>(null);

  facilityIcons: Record<string, any> = {
    '24/7 Care': Activity, 'ICU': Activity, 'Pharmacy': Pill, 'Lab': Stethoscope,
    'Wifi': Wifi, 'Parking': Car, 'Cafeteria': Coffee, 'Surgery': Stethoscope,
    'Heart Center': Activity, 'Transplant Unit': Activity, 'Wellness': Coffee, 'Hotel': Building
  };

  getFacilityIcon(name: string) { return this.facilityIcons[name] ?? Activity; }

  setTab(t: Tab) { this.tab.set(t); }
  pickDay(d: number) { this.selectedDate.set(`2026-05-${String(d).padStart(2, '0')}`); }

  isDayActive(d: number): boolean {
    return this.selectedDate() === `2026-05-${String(d).padStart(2, '0')}`;
  }

  bookAppointment() {
    const h = this.hospital();
    if (!h || !this.selectedDate()) return;

    const doctor = h.doctors[0];
    const booking: Booking = {
      id: 'b-' + Date.now(),
      hospitalId: h.id,
      hospitalName: h.name,
      hospitalImage: h.image,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      date: this.selectedDate(),
      time: '—',
      status: 'Confirmed',
      bookingNumber: 'MT-' + Date.now().toString().slice(-8) + '-' + Math.floor(Math.random()*900 + 100)
    };

    this.data.addBooking(booking);
    this.successBooking.set(booking);
    this.showSuccess.set(true);
  }

  closeSuccess() {
    this.showSuccess.set(false);
    this.router.navigate(['/portal/bookings']);
  }

  viewBookings() {
    this.router.navigate(['/portal/bookings']);
  }

  // Review form helpers
  openReviewForm() {
    this.showReviewForm.set(true);
    this.reviewError.set(null);
  }
  closeReviewForm() {
    this.showReviewForm.set(false);
    this.reviewRating.set(0);
    this.reviewComment.set('');
    this.reviewError.set(null);
  }
  setRating(n: number) { this.reviewRating.set(n); }
  setHover(n: number) { this.reviewHover.set(n); }

  submitReview() {
    if (this.reviewRating() === 0) {
      this.reviewError.set('Please select a rating.');
      return;
    }
    if (!this.reviewComment().trim()) {
      this.reviewError.set('Please share your experience.');
      return;
    }
    const user = this.auth.user();
    const review: Review = {
      id: 'r-' + Date.now(),
      user: user?.name ?? 'Anonymous',
      avatar: user?.avatar ?? 'https://ui-avatars.com/api/?name=Patient&background=143566&color=fff',
      rating: this.reviewRating(),
      date: new Date().toISOString().slice(0, 10),
      comment: this.reviewComment().trim()
    };
    this.data.addReview(review);
    this.closeReviewForm();
  }
}
