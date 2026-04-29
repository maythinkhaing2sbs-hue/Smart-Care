import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideAngularModule, LayoutDashboard, CalendarCheck, Stethoscope, Building2, Plane, FileText, CreditCard, LogOut, Bell, Search, Menu, X, HeartPulse, ArrowLeft } from 'lucide-angular';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-portal-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, LucideAngularModule],
  templateUrl: './portal-layout.component.html',
  styleUrl: './portal-layout.component.scss'
})
export class PortalLayoutComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  readonly icons = { LayoutDashboard, CalendarCheck, Stethoscope, Building2, Plane, FileText, CreditCard, LogOut, Bell, Search, Menu, X, HeartPulse, ArrowLeft };

  sidebarOpen = signal(false);
  sidebarCollapsed = signal(false);
  notifOpen = signal(false);

  notifications = [
    { id: 1, title: 'Booking confirmed', text: 'Your appointment with Dr. John Smith is confirmed for May 15.', time: '2h ago', unread: true },
    { id: 2, title: 'New message', text: 'Dr. Emily Carter sent you a message regarding your consultation.', time: '5h ago', unread: true },
    { id: 3, title: 'Document uploaded', text: 'Your CT_Scan_Report.pdf has been added to your records.', time: '1d ago', unread: false }
  ];

  navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, link: '/portal/dashboard' },
    { label: 'My Bookings', icon: CalendarCheck, link: '/portal/bookings', badge: 2 },
    { label: 'Consultation', icon: Stethoscope, link: '/portal/consultation' },
    { label: 'Hospitals', icon: Building2, link: '/portal/hospitals' },
    { label: 'Trip Plan', icon: Plane, link: '/portal/trip' },
    { label: 'Documents', icon: FileText, link: '/portal/documents' },
    { label: 'Payments', icon: CreditCard, link: '/portal/payments' }
  ];

  toggleSidebar() {
    if (window.innerWidth <= 992) {
      this.sidebarOpen.update(v => !v);
    } else {
      this.sidebarCollapsed.update(v => !v);
    }
  }
  closeSidebar() { this.sidebarOpen.set(false); }
  toggleNotif() { this.notifOpen.update(v => !v); }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
