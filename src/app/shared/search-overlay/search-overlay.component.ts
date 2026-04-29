import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, Search, MapPin, Activity, X, ArrowRight } from 'lucide-angular';

import { AuthService } from '../../core/services/auth.service';
import { UiService } from '../../core/services/ui.service';

@Component({
  selector: 'app-search-overlay',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './search-overlay.component.html',
  styleUrl: './search-overlay.component.scss'
})
export class SearchOverlayComponent {
  ui = inject(UiService);
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly icons = { Search, MapPin, Activity, X, ArrowRight };

  disease = signal('');
  location = signal('');

  popularDiseases = ['Cardiology', 'Oncology', 'Orthopedics', 'Neurology', 'Cosmetic Surgery', 'Fertility'];
  popularLocations = ['USA', 'India', 'Turkey', 'Thailand', 'Singapore', 'South Korea'];

  pickDisease(d: string) { this.disease.set(d); }
  pickLocation(l: string) { this.location.set(l); }

  submit() {
    const criteria = { disease: this.disease().trim(), location: this.location().trim() };

    if (!this.auth.isLoggedIn()) {
      this.ui.pendingSearch.set(criteria);
      this.ui.closeSearch();
      this.ui.openAuth('login');
      return;
    }

    this.ui.closeSearch();
    this.router.navigate(['/portal/hospitals'], {
      queryParams: { disease: criteria.disease, location: criteria.location }
    });
  }
}
