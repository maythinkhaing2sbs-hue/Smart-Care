import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'portal',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/portal/portal-layout.component').then(m => m.PortalLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/portal/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'bookings', loadComponent: () => import('./pages/portal/bookings/bookings.component').then(m => m.BookingsComponent) },
      { path: 'consultation', loadComponent: () => import('./pages/portal/consultation/consultation.component').then(m => m.ConsultationComponent) },
      { path: 'hospitals', loadComponent: () => import('./pages/portal/hospitals/hospitals.component').then(m => m.HospitalsComponent) },
      { path: 'hospitals/:id', loadComponent: () => import('./pages/portal/hospital-detail/hospital-detail.component').then(m => m.HospitalDetailComponent) },
      { path: 'trip', loadComponent: () => import('./pages/portal/trip/trip.component').then(m => m.TripComponent) },
      { path: 'documents', loadComponent: () => import('./pages/portal/documents/documents.component').then(m => m.DocumentsComponent) },
      { path: 'payments', loadComponent: () => import('./pages/portal/payments/payments.component').then(m => m.PaymentsComponent) },
      { path: 'profile', loadComponent: () => import('./pages/portal/profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'support', loadComponent: () => import('./pages/portal/support/support.component').then(m => m.SupportComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];
