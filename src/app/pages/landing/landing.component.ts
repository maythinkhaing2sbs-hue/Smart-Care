import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Stethoscope, Building2, CalendarCheck, Plane, Star, ArrowRight, ShieldCheck, HeartPulse, MessageSquare, Globe, Search, MessageCircle, Award, Users, MapPin } from 'lucide-angular';

import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SearchOverlayComponent } from '../../shared/search-overlay/search-overlay.component';
import { ChatbotComponent } from '../../shared/chatbot/chatbot.component';
import { UiService } from '../../core/services/ui.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, NavbarComponent, SearchOverlayComponent, ChatbotComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  ui = inject(UiService);
  data = inject(DataService);

  readonly icons = {
    Stethoscope, Building2, CalendarCheck, Plane, Star, ArrowRight,
    ShieldCheck, HeartPulse, MessageSquare, Globe, Search, MessageCircle,
    Award, Users, MapPin
  };

  services = [
    { icon: Stethoscope, title: 'Medical Consultation', desc: 'Expert advisor assignment and structured online/offline consultation sessions.', color: '#143566' },
    { icon: Building2, title: 'Hospital Discovery', desc: 'Comprehensive hospital listings with ratings and comparison tools for informed decisions.', color: '#3F72C0' },
    { icon: CalendarCheck, title: 'Appointment Booking', desc: 'Easy booking requests with real-time confirmation and tracking.', color: '#143566' },
    { icon: Plane, title: 'Travel Coordination', desc: 'End-to-end trip planning. Reliable pickup and drop-off arrangements for patients and companions.', color: '#3F72C0' },
    { icon: MessageSquare, title: 'Feedback & Recommendations', desc: 'Patient reviews and data-driven insights to improve care quality and experience.', color: '#143566' }
  ];

  steps = [
    { n: '01', title: 'Describe your concern', desc: 'Chat with our AI to share symptoms or use search to explore by specialty and location.' },
    { n: '02', title: 'Discover hospitals', desc: 'Compare verified hospitals, doctors, ratings and facilities tailored to your needs.' },
    { n: '03', title: 'Book your appointment', desc: 'Pick a date and time. Confirmation arrives in minutes — no back-and-forth.' },
    { n: '04', title: 'Travel with peace of mind', desc: 'We coordinate flights, hotels, transport and itinerary so you can focus on recovery.' }
  ];

  stats = [
    { value: '120+', label: 'Verified Hospitals' },
    { value: '40+', label: 'Specialties' },
    { value: '15+', label: 'Countries' },
    { value: '50K+', label: 'Patients Served' }
  ];

  features = [
    { icon: ShieldCheck, title: 'Verified & Accredited', desc: 'Every hospital is JCI / ISO accredited and reviewed by our medical board.' },
    { icon: HeartPulse, title: 'AI-Powered Matching', desc: 'Our AI matches your condition with the best-fit specialist based on outcomes.' },
    { icon: Globe, title: 'Global Coverage', desc: 'Access world-class care across the USA, India, Turkey, Thailand and more.' },
    { icon: Award, title: 'Transparent Reviews', desc: 'Read genuine patient experiences before deciding. No paid placements.' }
  ];

  scrollToServices() {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  }
}
