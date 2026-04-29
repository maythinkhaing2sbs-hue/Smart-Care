import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CreditCard, CheckCircle2, Receipt, ShieldCheck, Sparkles } from 'lucide-angular';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
  readonly icons = { CreditCard, CheckCircle2, Receipt, ShieldCheck, Sparkles };

  history = [
    { id: 'p1', desc: 'Consultation Fee', date: '2026-04-02', amount: '$0', status: 'Free' },
    { id: 'p2', desc: 'AI Symptom Check', date: '2026-04-12', amount: '$0', status: 'Free' },
    { id: 'p3', desc: 'Hospital Booking Service', date: '2026-04-22', amount: '$0', status: 'Free' }
  ];
}
