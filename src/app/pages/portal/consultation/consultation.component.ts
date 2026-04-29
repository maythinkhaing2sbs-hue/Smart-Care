import { AfterViewChecked, Component, ElementRef, ViewChild, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, Plus, Send, Paperclip, Sparkles, Lightbulb, Image as ImageIcon, Search, MessageSquare, MoreHorizontal, Pencil, Stethoscope, ArrowRight, Menu, X, ShieldCheck, Star, HeartPulse } from 'lucide-angular';

import { AuthService } from '../../../core/services/auth.service';
import { DataService } from '../../../core/services/data.service';

interface AssistantHospitalSuggestion {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  location: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  streaming?: boolean;
  hospitalSuggestion?: AssistantHospitalSuggestion;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: Date;
}

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.scss'
})
export class ConsultationComponent implements AfterViewChecked {
  auth = inject(AuthService);
  data = inject(DataService);
  private router = inject(Router);

  readonly icons = { Plus, Send, Paperclip, Sparkles, Lightbulb, ImageIcon, Search, MessageSquare, MoreHorizontal, Pencil, Stethoscope, ArrowRight, Menu, X, ShieldCheck, Star, HeartPulse };

  @ViewChild('msgScroll') msgScroll?: ElementRef<HTMLDivElement>;

  drawerOpen = signal(false);
  input = signal('');
  isStreaming = signal(false);
  shouldScroll = false;

  sessions = signal<ChatSession[]>([
    {
      id: 'sess-1',
      title: 'Chest pain & shortness of breath',
      messages: [
        {
          id: 'm1', role: 'user',
          content: "I've been having chest pain and feel short of breath after walking up stairs.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
        },
        {
          id: 'm2', role: 'assistant',
          content: 'Your symptoms suggest a possible cardiovascular concern. Common conditions include angina, arrhythmia, or hypertension. I would recommend an ECG and stress test with a cardiology specialist as the next step. Cleveland Clinic has a top-rated cardiac care unit you may want to explore.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 5000),
          hospitalSuggestion: { id: 'h3', name: 'Cleveland Clinic', specialty: 'Cardiology', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80', rating: 4.7, location: 'Cleveland, USA' }
        }
      ],
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    {
      id: 'sess-2',
      title: 'Persistent migraines almost daily',
      messages: [
        {
          id: 'm3', role: 'user',
          content: 'I have been getting migraines lately, almost every other day. Pain on the right side.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26)
        },
        {
          id: 'm4', role: 'assistant',
          content: 'Frequent neurological symptoms can stem from triggers like stress, sleep disorders or vascular issues. A neurology consultation including imaging would help narrow this down. Mayo Clinic has highly-regarded neurologists.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26 + 5000),
          hospitalSuggestion: { id: 'h2', name: 'Mayo Clinic', specialty: 'Neurology', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=400&q=80', rating: 4.9, location: 'Rochester, USA' }
        }
      ],
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 26)
    },
    {
      id: 'sess-3',
      title: 'Cost estimate for spine surgery',
      messages: [
        {
          id: 'm5', role: 'user',
          content: 'Roughly how much does spine surgery cost in India versus Turkey?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
        },
        {
          id: 'm6', role: 'assistant',
          content: 'Costs vary by procedure and hospital, but India and Turkey both offer excellent value. Spinal fusion typically ranges $5,000–$10,000 in India and $7,000–$12,000 in Turkey, including a hospital stay. Quality is comparable to leading Western hospitals.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5 + 3000)
        }
      ],
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
    }
  ]);

  activeSessionId = signal<string | null>(null);

  activeSession = computed(() => {
    const id = this.activeSessionId();
    return id ? this.sessions().find(s => s.id === id) ?? null : null;
  });

  firstName = computed(() => {
    const name = this.auth.user()?.name ?? 'there';
    return name.split(' ')[0] || name;
  });

  greetingPart = computed(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 18) return 'Good Afternoon';
    return 'Good Evening';
  });

  groupedSessions = computed(() => {
    const sessions = [...this.sessions()].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today); weekAgo.setDate(weekAgo.getDate() - 7);

    const groups: { label: string; items: ChatSession[] }[] = [
      { label: 'Today', items: [] },
      { label: 'Yesterday', items: [] },
      { label: 'Previous 7 days', items: [] },
      { label: 'Older', items: [] }
    ];

    for (const s of sessions) {
      if (s.updatedAt >= today) groups[0].items.push(s);
      else if (s.updatedAt >= yesterday) groups[1].items.push(s);
      else if (s.updatedAt >= weekAgo) groups[2].items.push(s);
      else groups[3].items.push(s);
    }
    return groups.filter(g => g.items.length > 0);
  });

  quickPrompts = [
    { icon: Lightbulb, label: 'Reasoning', prompt: 'Help me reason through these symptoms' },
    { icon: ImageIcon, label: 'Create Image', prompt: 'Visualize my treatment journey' },
    { icon: Search, label: 'Deep Research', prompt: 'Research treatment options for' }
  ];

  starterPrompts = [
    'What hospitals are best for cardiac surgery?',
    'I have persistent back pain — what should I do?',
    'How long is recovery after a knee replacement?',
    'Compare cancer treatment options abroad'
  ];

  ngAfterViewChecked() {
    if (this.shouldScroll && this.msgScroll) {
      const el = this.msgScroll.nativeElement;
      el.scrollTop = el.scrollHeight;
      this.shouldScroll = false;
    }
  }

  newChat() {
    this.activeSessionId.set(null);
    this.input.set('');
    this.drawerOpen.set(false);
  }

  selectSession(id: string) {
    this.activeSessionId.set(id);
    this.shouldScroll = true;
    this.drawerOpen.set(false);
  }

  toggleDrawer() { this.drawerOpen.update(v => !v); }

  pickStarter(p: string) {
    this.input.set(p);
  }

  relativeTime(date: Date): string {
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    if (diff < 604800) return Math.floor(diff / 86400) + 'd ago';
    return Math.floor(diff / 604800) + 'w ago';
  }

  send() {
    const text = this.input().trim();
    if (!text || this.isStreaming()) return;

    let sessionId = this.activeSessionId();

    if (!sessionId) {
      const newSession: ChatSession = {
        id: 'sess-' + Date.now(),
        title: text.length > 48 ? text.slice(0, 48) + '...' : text,
        messages: [],
        updatedAt: new Date()
      };
      this.sessions.update(list => [newSession, ...list]);
      sessionId = newSession.id;
      this.activeSessionId.set(sessionId);
    }

    const userMsg: ChatMessage = {
      id: 'u-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    const sid = sessionId;
    this.sessions.update(list => list.map(s => s.id === sid
      ? { ...s, messages: [...s.messages, userMsg], updatedAt: new Date() }
      : s));
    this.input.set('');
    this.shouldScroll = true;

    this.streamResponse(sid, text);
  }

  private streamResponse(sessionId: string, prompt: string) {
    const { content, suggestion } = this.generateResponse(prompt);
    const aiId = 'a-' + Date.now();

    // Append empty assistant message
    this.sessions.update(list => list.map(s => s.id === sessionId ? {
      ...s,
      messages: [...s.messages, { id: aiId, role: 'assistant', content: '', timestamp: new Date(), streaming: true }]
    } : s));

    this.isStreaming.set(true);
    this.shouldScroll = true;

    let pos = 0;
    const total = content.length;

    const tick = () => {
      pos += 3 + Math.floor(Math.random() * 6);
      const isDone = pos >= total;
      const partial = content.slice(0, isDone ? total : pos);

      this.sessions.update(list => list.map(s => s.id === sessionId ? {
        ...s,
        messages: s.messages.map(m => m.id === aiId ? {
          ...m,
          content: partial,
          streaming: !isDone,
          hospitalSuggestion: isDone ? suggestion : undefined
        } : m),
        updatedAt: new Date()
      } : s));
      this.shouldScroll = true;

      if (isDone) {
        this.isStreaming.set(false);
        return;
      }
      setTimeout(tick, 25);
    };

    setTimeout(tick, 250);
  }

  private generateResponse(input: string): { content: string; suggestion?: AssistantHospitalSuggestion } {
    const lower = input.toLowerCase();
    const hospitals = this.data.hospitals();

    if (/(chest|heart|breath|palpitation|cardio|blood pressure)/.test(lower)) {
      const h = hospitals.find(x => x.specialties.some(s => /cardio/i.test(s))) ?? hospitals[2];
      return {
        content: `Your symptoms suggest a possible cardiovascular concern. Common conditions include angina, arrhythmia, or hypertension. I'd recommend an ECG and stress test with a cardiology specialist as the next step. ${h.name} has a top-rated cardiac care unit you may want to explore.`,
        suggestion: { id: h.id, name: h.name, specialty: 'Cardiology', image: h.image, rating: h.rating, location: h.location }
      };
    }
    if (/(headache|migraine|dizz|seizure|memory|neuro)/.test(lower)) {
      const h = hospitals.find(x => x.specialties.some(s => /neuro/i.test(s))) ?? hospitals[1];
      return {
        content: `Frequent neurological symptoms can stem from various causes — vascular issues, sleep disorders, or chronic migraine. A neurology consultation including imaging would help narrow this down. ${h.name} has highly-regarded neurologists.`,
        suggestion: { id: h.id, name: h.name, specialty: 'Neurology', image: h.image, rating: h.rating, location: h.location }
      };
    }
    if (/(joint|knee|back|bone|spine|fracture|orthop)/.test(lower)) {
      const h = hospitals.find(x => x.specialties.some(s => /orthop/i.test(s))) ?? hospitals[3];
      return {
        content: `Musculoskeletal pain in this pattern is often related to arthritis, ligament injury, or spinal misalignment. An orthopedic evaluation including X-ray or MRI is the typical first step. ${h.name} offers comprehensive orthopedic services with internationally trained surgeons.`,
        suggestion: { id: h.id, name: h.name, specialty: 'Orthopedics', image: h.image, rating: h.rating, location: h.location }
      };
    }
    if (/(cancer|tumor|lump|oncolog|chemo)/.test(lower)) {
      const h = hospitals[0];
      return {
        content: `Any unexplained growth warrants a full oncology evaluation including imaging and biopsy. Early detection significantly improves outcomes. ${h.name} is one of the world's leading cancer centers and would be an excellent place to start.`,
        suggestion: { id: h.id, name: h.name, specialty: 'Oncology', image: h.image, rating: h.rating, location: h.location }
      };
    }
    if (/(skin|rash|acne|hair|cosmetic|derma)/.test(lower)) {
      const h = hospitals[5];
      return {
        content: `Dermatological symptoms can range from allergic reactions to chronic conditions like eczema or psoriasis. A dermatology consultation can usually identify the cause quickly with a clinical exam and biopsy if needed. ${h.name} provides excellent care in this area.`,
        suggestion: { id: h.id, name: h.name, specialty: 'Dermatology', image: h.image, rating: h.rating, location: h.location }
      };
    }
    if (/(cost|price|how much|estimate|insurance)/.test(lower)) {
      return {
        content: `Costs depend heavily on procedure type and destination. Generally, India offers savings of 60-80% compared to the US, while Turkey and Thailand offer 50-70%. All Smart Care partner hospitals provide upfront cost estimates including hospital stay, doctor fees and post-op care. Would you like me to suggest a hospital for a specific procedure?`,
        suggestion: undefined
      };
    }

    return {
      content: `Thanks for sharing that. Based on what you've described, an initial general consultation will help us narrow down the right specialist. I can match you to a multi-specialty hospital where you can begin the evaluation — would you like me to suggest one?`,
      suggestion: undefined
    };
  }

  viewHospital(id: string) {
    this.router.navigate(['/portal/hospitals', id]);
  }

  deleteSession(id: string, evt: Event) {
    evt.stopPropagation();
    this.sessions.update(list => list.filter(s => s.id !== id));
    if (this.activeSessionId() === id) this.activeSessionId.set(null);
  }
}
