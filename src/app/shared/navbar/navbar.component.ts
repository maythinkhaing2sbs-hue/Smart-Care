import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, Search, Menu, X, Heart, LogOut, LayoutDashboard } from 'lucide-angular';

import { AuthService } from '../../core/services/auth.service';
import { UiService } from '../../core/services/ui.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  auth = inject(AuthService);
  ui = inject(UiService);
  private router = inject(Router);

  readonly icons = { Search, Menu, X, Heart, LogOut, LayoutDashboard };

  scrolled = signal(false);
  mobileOpen = signal(false);
  userMenuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMobile() { this.mobileOpen.update(v => !v); }
  closeMobile() { this.mobileOpen.set(false); }

  toggleSearch() {
    this.ui.toggleSearch();
    this.closeMobile();
  }

  toggleUserMenu() { this.userMenuOpen.update(v => !v); }

  goToPortal() {
    this.userMenuOpen.set(false);
    this.router.navigate(['/portal/dashboard']);
  }

  logout() {
    this.userMenuOpen.set(false);
    this.auth.logout();
    this.router.navigate(['/']);
  }

  openRegister() {
    this.closeMobile();
    this.ui.openAuth('register');
  }
}
