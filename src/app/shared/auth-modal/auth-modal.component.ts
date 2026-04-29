import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, X, Mail, Lock, User, Phone, Eye, EyeOff, Heart } from 'lucide-angular';

import { AuthService } from '../../core/services/auth.service';
import { UiService } from '../../core/services/ui.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss'
})
export class AuthModalComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  ui = inject(UiService);

  readonly icons = { X, Mail, Lock, User, Phone, Eye, EyeOff, Heart };

  showPassword = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  // Login form
  loginEmail = '';
  loginPassword = '';

  // Register form
  regName = '';
  regEmail = '';
  regPhone = '';
  regPassword = '';
  agreeTerms = false;

  switchMode(mode: 'login' | 'register') {
    this.error.set(null);
    this.ui.authMode.set(mode);
  }

  close() {
    this.error.set(null);
    this.ui.closeAuth();
  }

  togglePassword() { this.showPassword.update(v => !v); }

  submitLogin() {
    this.error.set(null);
    if (!this.loginEmail || !this.loginPassword) {
      this.error.set('Please fill in all fields.');
      return;
    }
    this.loading.set(true);
    setTimeout(() => {
      this.auth.login(this.loginEmail, this.loginPassword);
      this.loading.set(false);
      this.afterAuth();
    }, 600);
  }

  submitRegister() {
    this.error.set(null);
    if (!this.regName || !this.regEmail || !this.regPassword) {
      this.error.set('Please fill in all required fields.');
      return;
    }
    if (!this.agreeTerms) {
      this.error.set('Please agree to the terms of service.');
      return;
    }
    this.loading.set(true);
    setTimeout(() => {
      this.auth.register(this.regName, this.regEmail, this.regPassword, this.regPhone);
      this.loading.set(false);
      this.afterAuth();
    }, 600);
  }

  private afterAuth() {
    this.ui.closeAuth();
    const target = this.ui.redirectAfterAuth();
    const search = this.ui.pendingSearch();

    if (search) {
      this.ui.pendingSearch.set(null);
      this.router.navigate(['/portal/hospitals'], {
        queryParams: { disease: search.disease, location: search.location }
      });
      return;
    }
    if (target) {
      this.ui.redirectAfterAuth.set(null);
      this.router.navigateByUrl(target);
      return;
    }
    this.router.navigate(['/portal/dashboard']);
  }
}
