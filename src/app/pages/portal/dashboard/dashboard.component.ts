import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, CheckCircle2, CalendarCheck, Plane, FileText, ArrowRight, Star, MapPin, Clock, MessageCircle, TrendingUp, TrendingDown, Activity, Stethoscope, Building2, Sparkles, ArrowUpRight, MoreHorizontal, Phone, Mail, Calendar, ChevronRight } from 'lucide-angular';

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

  readonly icons = { CheckCircle2, CalendarCheck, Plane, FileText, ArrowRight, Star, MapPin, Clock, MessageCircle, TrendingUp, TrendingDown, Activity, Stethoscope, Building2, Sparkles, ArrowUpRight, MoreHorizontal, Phone, Mail, Calendar, ChevronRight };

  // Journey as horizontal stepper
  journey: { label: string; status: 'done' | 'in-progress' | 'pending' }[] = [
    { label: 'Consultation', status: 'in-progress' },
    { label: 'Hospital', status: 'pending' },
    { label: 'Booking', status: 'pending' },
    { label: 'Trip Plan', status: 'pending' },
    { label: 'Treatment', status: 'pending' },
    { label: 'Follow Up', status: 'pending' }
  ];

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
    { id: 4, type: 'consultation', title: 'AI consultation completed — recommended Oncology', time: '2 days ago', icon: Sparkles, color: '#f59e0b' }
  ];

  careTeam = {
    name: 'Dr. Emily Carter',
    role: 'Medical Advisor',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 4.9,
    reviews: 128,
    nextSession: 'May 15, 11:00 AM'
  };

  quickActions = [
    { label: 'Book Appointment', icon: CalendarCheck, link: '/portal/hospitals', accent: 'primary' },
    { label: 'Start Consultation', icon: Sparkles, link: '/portal/consultation', accent: 'secondary' },
    { label: 'Upload Document', icon: FileText, link: '/portal/documents', accent: 'outline' },
    { label: 'View Trip Plan', icon: Plane, link: '/portal/trip', accent: 'outline' }
  ];
}
