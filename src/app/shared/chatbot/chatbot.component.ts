import { Component, ElementRef, ViewChild, inject, signal, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, MessageCircle, X, Send, Stethoscope, Sparkles, ArrowRight, Bot, User as UserIcon } from 'lucide-angular';

import { AuthService } from '../../core/services/auth.service';
import { UiService } from '../../core/services/ui.service';
import { ChatMessage } from '../../core/models/hospital.model';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements AfterViewChecked {
  ui = inject(UiService);
  private auth = inject(AuthService);
  private router = inject(Router);

  @ViewChild('msgScroll') msgScroll?: ElementRef<HTMLDivElement>;

  readonly icons = { MessageCircle, X, Send, Stethoscope, Sparkles, ArrowRight, Bot, UserIcon };

  input = signal('');
  isTyping = signal(false);
  shouldScroll = false;

  messages = signal<ChatMessage[]>([
    {
      id: 'm1',
      role: 'bot',
      text: "Hi, I'm Smart Care AI 👋  I can help you understand your symptoms and find the right specialist. What are you experiencing?",
      timestamp: new Date(),
      suggestions: ['Chest pain & shortness of breath', 'Persistent headaches', 'Joint pain', 'Skin issues']
    }
  ]);

  ngAfterViewChecked() {
    if (this.shouldScroll && this.msgScroll) {
      this.msgScroll.nativeElement.scrollTop = this.msgScroll.nativeElement.scrollHeight;
      this.shouldScroll = false;
    }
  }

  pickSuggestion(s: string) {
    this.input.set(s);
    this.send();
  }

  send() {
    const text = this.input().trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: 'u-' + Date.now(),
      role: 'user',
      text,
      timestamp: new Date()
    };
    this.messages.update(list => [...list, userMsg]);
    this.input.set('');
    this.shouldScroll = true;
    this.isTyping.set(true);

    setTimeout(() => {
      const reply = this.generateReply(text);
      this.messages.update(list => [...list, reply]);
      this.isTyping.set(false);
      this.shouldScroll = true;
    }, 1100);
  }

  private generateReply(input: string): ChatMessage {
    const lower = input.toLowerCase();
    let analysis = '';
    let specialty = 'Internal Medicine';

    if (/(chest|heart|breath|palpitation)/.test(lower)) {
      analysis = 'These symptoms may indicate a cardiovascular concern. Possible conditions include angina, arrhythmia, or hypertension.';
      specialty = 'Cardiology';
    } else if (/(headache|migraine|dizz|seizure|memory)/.test(lower)) {
      analysis = 'Persistent headaches and neurological symptoms can have various causes — from migraines to vascular conditions.';
      specialty = 'Neurology';
    } else if (/(joint|knee|back|bone|spine|fracture)/.test(lower)) {
      analysis = 'These musculoskeletal symptoms could be related to arthritis, ligament injury, or spinal conditions.';
      specialty = 'Orthopedics';
    } else if (/(skin|rash|acne|hair|cosmetic)/.test(lower)) {
      analysis = 'Dermatological symptoms can range from allergic reactions to chronic conditions like eczema or psoriasis.';
      specialty = 'Dermatology';
    } else if (/(cancer|tumor|lump|oncolog)/.test(lower)) {
      analysis = 'Any unexplained lumps or growths warrant a thorough oncology consultation for evaluation and screening.';
      specialty = 'Oncology';
    } else {
      analysis = "Based on what you've shared, an initial general consultation will help narrow down the right specialist for your case.";
      specialty = 'General Medicine';
    }

    return {
      id: 'b-' + Date.now(),
      role: 'bot',
      text: `${analysis}\n\nI recommend consulting a **${specialty}** specialist. We have top-rated hospitals offering this. Would you like to consult with a hospital?`,
      timestamp: new Date(),
      showConsultButton: true
    };
  }

  consultWithHospital() {
    if (!this.auth.isLoggedIn()) {
      this.ui.redirectAfterAuth.set('/portal/hospitals');
      this.ui.closeChat();
      this.ui.openAuth('login');
      return;
    }
    this.ui.closeChat();
    this.router.navigate(['/portal/hospitals']);
  }
}
