import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, CheckCircle2, CalendarCheck, Plane, FileText, ArrowRight, Star, MapPin, Clock, MessageCircle, TrendingUp, TrendingDown, Activity, Stethoscope, Building2, Sparkles, ArrowUpRight, MoreHorizontal, Calendar, ChevronRight, Globe, Award } from 'lucide-angular';

import { AuthService } from '../../../core/services/auth.service';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  auth = inject(AuthService);
  data = inject(DataService);

  readonly icons = { CheckCircle2, CalendarCheck, Plane, FileText, ArrowRight, Star, MapPin, Clock, MessageCircle, TrendingUp, TrendingDown, Activity, Stethoscope, Building2, Sparkles, ArrowUpRight, MoreHorizontal, Calendar, ChevronRight, Globe, Award };

  hospitalCount = computed(() => this.data.hospitals().length);
  countryCount = computed(() => new Set(this.data.hospitals().map(h => h.country)).size);
  specialtyCount = computed(() => {
    const set = new Set<string>();
    this.data.hospitals().forEach(h => h.specialties.forEach(s => set.add(s)));
    return set.size;
  });

  kpis = [
    { label: 'Active Consultations', value: '2', delta: '+1', positive: true, icon: MessageCircle, hint: 'vs last month' },
    { label: 'Confirmed Bookings', value: '1', delta: '+1', positive: true, icon: CalendarCheck, hint: 'this week' },
    { label: 'Trip Days Planned', value: '10', delta: '5 days left', positive: true, icon: Plane, hint: 'until departure' },
    { label: 'Documents on File', value: '5', delta: '+2', positive: true, icon: FileText, hint: 'this month' }
  ];

  activities = [
    { id: 1, type: 'booking', title: 'Booking confirmed at Memorial Sloan Kettering', time: '2 hours ago', icon: CalendarCheck, color: '#16a34a' },
    { id: 2, type: 'document', title: 'CT_Scan_Report.pdf uploaded to medical records', time: '5 hours ago', icon: FileText, color: '#3F72C0' },
    { id: 3, type: 'message', title: 'Dr. John Smith requested your latest scan report', time: 'Yesterday', icon: MessageCircle, color: '#143566' },
    { id: 4, type: 'consultation', title: 'AI consultation completed — recommended Oncology', time: '2 days ago', icon: Sparkles, color: '#f59e0b' },
    { id: 5, type: 'trip', title: 'Trip plan to New York saved · departing May 20', time: '3 days ago', icon: Plane, color: '#3F72C0' },
    { id: 6, type: 'hospital', title: 'Mayo Clinic added to your saved hospitals', time: '5 days ago', icon: Building2, color: '#143566' }
  ];

  quickActions = [
    { label: 'Book Appointment', icon: CalendarCheck, link: '/portal/hospitals', accent: 'primary' },
    { label: 'Start Consultation', icon: Sparkles, link: '/portal/consultation', accent: 'secondary' },
    { label: 'Upload Document', icon: FileText, link: '/portal/documents', accent: 'outline' },
    { label: 'View Trip Plan', icon: Plane, link: '/portal/trip', accent: 'outline' }
  ];

  relativeTime(date: Date): string {
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    if (diff < 604800) return Math.floor(diff / 86400) + 'd ago';
    return Math.floor(diff / 604800) + 'w ago';
  }
}
