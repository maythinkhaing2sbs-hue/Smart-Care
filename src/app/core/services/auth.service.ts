import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
}

export interface SearchCriteria {
  disease: string;
  location: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'sc_user';
  private readonly _user = signal<User | null>(this.loadUser());

  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);

  login(email: string, _password: string): User {
    const user: User = {
      id: 'u-' + Math.random().toString(36).slice(2, 10),
      name: this.deriveNameFromEmail(email),
      email,
      avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(this.deriveNameFromEmail(email)) + '&background=143566&color=fff',
    };
    this.persist(user);
    return user;
  }

  register(name: string, email: string, _password: string, phone?: string): User {
    const user: User = {
      id: 'u-' + Math.random().toString(36).slice(2, 10),
      name,
      email,
      phone,
      avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=143566&color=fff',
    };
    this.persist(user);
    return user;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this._user.set(null);
  }

  updateProfile(updates: Partial<User>): void {
    const current = this._user();
    if (!current) return;
    const updated = { ...current, ...updates };
    this.persist(updated);
  }

  private persist(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this._user.set(user);
  }

  private loadUser(): User | null {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  private deriveNameFromEmail(email: string): string {
    const handle = email.split('@')[0] ?? 'User';
    return handle
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }
}
