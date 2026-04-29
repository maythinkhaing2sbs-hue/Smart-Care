import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, MessageCircle, Phone, Mail, HelpCircle, ChevronDown, Send, Globe, Sparkles } from 'lucide-angular';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent {
  readonly icons = { MessageCircle, Phone, Mail, HelpCircle, ChevronDown, Send, Globe, Sparkles };

  faqs = signal([
    { q: 'How do I book an appointment with a hospital?', a: 'After signing in, browse hospitals from the portal, click on a hospital and use the booking calendar on the right to pick a date and time. You\'ll receive confirmation in minutes.', open: true },
    { q: 'Are my medical documents secure?', a: 'Yes. All documents are encrypted at rest and in transit. Only you and the medical team you authorize can view them.', open: false },
    { q: 'Is the AI consultation a replacement for a real doctor?', a: 'No. Our AI provides initial guidance based on symptoms but is not a substitute for professional medical advice, diagnosis, or treatment.', open: false },
    { q: 'Does Smart Care charge any fees?', a: 'Currently all platform services are free. Hospital treatment costs are paid directly to the hospital.', open: false },
    { q: 'Can Smart Care help with visa and travel arrangements?', a: 'Yes — once your appointment is confirmed, the trip planner provides flight schedules, hotel suggestions, transportation booking, and visa documentation guidance.', open: false }
  ]);

  contactName = '';
  contactEmail = '';
  contactSubject = '';
  contactMessage = '';
  submitted = signal(false);

  toggleFaq(idx: number) {
    this.faqs.update(list =>
      list.map((f, i) => ({ ...f, open: i === idx ? !f.open : f.open }))
    );
  }

  submitContact() {
    this.submitted.set(true);
    setTimeout(() => this.submitted.set(false), 3000);
    this.contactName = this.contactEmail = this.contactSubject = this.contactMessage = '';
  }
}
