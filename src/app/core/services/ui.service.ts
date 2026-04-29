import { Injectable, signal } from '@angular/core';
import { SearchCriteria } from './auth.service';

export type AuthMode = 'login' | 'register';

@Injectable({ providedIn: 'root' })
export class UiService {
  // Search overlay
  readonly searchOpen = signal(false);
  // Auth modal
  readonly authOpen = signal(false);
  readonly authMode = signal<AuthMode>('login');
  // Chatbot
  readonly chatOpen = signal(false);
  // Pending search (used after auth to redirect to portal)
  readonly pendingSearch = signal<SearchCriteria | null>(null);
  // Whether to redirect to portal after auth
  readonly redirectAfterAuth = signal<string | null>(null);

  toggleSearch() { this.searchOpen.update(v => !v); }
  closeSearch() { this.searchOpen.set(false); }

  openAuth(mode: AuthMode = 'login') {
    this.authMode.set(mode);
    this.authOpen.set(true);
  }
  closeAuth() { this.authOpen.set(false); }

  toggleChat() { this.chatOpen.update(v => !v); }
  closeChat() { this.chatOpen.set(false); }
  openChat() { this.chatOpen.set(true); }
}
