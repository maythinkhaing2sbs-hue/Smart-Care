import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule, Search, MapPin, Star, Building2, Globe, Award, ShieldCheck, X, ArrowRight, SlidersHorizontal, Grid3x3, ChevronDown, Check } from 'lucide-angular';

import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-hospitals',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.scss'
})
export class HospitalsComponent {
  data = inject(DataService);
  private route = inject(ActivatedRoute);
  readonly icons = { Search, MapPin, Star, Building2, Globe, Award, ShieldCheck, X, ArrowRight, SlidersHorizontal, Grid3x3, ChevronDown, Check };

  searchQ = signal('');
  selectedCountry = signal<string>('All');
  selectedSpecialty = signal<string>('All');

  specialtyOpen = signal(false);
  countryOpen = signal(false);

  countries = ['All', 'USA', 'India', 'Turkey', 'Thailand'];
  specialties = computed(() => {
    const set = new Set<string>(['All']);
    this.data.hospitals().forEach(h => h.specialties.forEach(s => set.add(s)));
    return Array.from(set);
  });

  filtered = computed(() => {
    const q = this.searchQ().toLowerCase().trim();
    const country = this.selectedCountry();
    const specialty = this.selectedSpecialty();

    const list = this.data.hospitals().filter(h => {
      const matchQ = !q || h.name.toLowerCase().includes(q) || h.specialty.toLowerCase().includes(q) || h.location.toLowerCase().includes(q);
      const matchCountry = country === 'All' || h.country === country;
      const matchSpec = specialty === 'All' || h.specialties.includes(specialty);
      return matchQ && matchCountry && matchSpec;
    });

    return [...list].sort((a, b) => b.rating - a.rating);
  });

  hasActiveFilters = computed(() =>
    !!this.searchQ() || this.selectedCountry() !== 'All' || this.selectedSpecialty() !== 'All'
  );

  ngOnInit() {
    this.route.queryParamMap.subscribe(p => {
      const disease = p.get('disease');
      const location = p.get('location');
      if (disease) this.searchQ.set(disease);
      if (location && this.countries.includes(location)) this.selectedCountry.set(location);
    });
  }

  setCountry(c: string) {
    this.selectedCountry.set(c);
    this.countryOpen.set(false);
  }
  setSpecialty(s: string) {
    this.selectedSpecialty.set(s);
    this.specialtyOpen.set(false);
  }

  toggleSpecialty() {
    this.specialtyOpen.update(v => !v);
    this.countryOpen.set(false);
  }
  toggleCountry() {
    this.countryOpen.update(v => !v);
    this.specialtyOpen.set(false);
  }

  closeDropdowns() {
    this.specialtyOpen.set(false);
    this.countryOpen.set(false);
  }

  clearFilters() {
    this.searchQ.set('');
    this.selectedCountry.set('All');
    this.selectedSpecialty.set('All');
  }

  clearSearch() { this.searchQ.set(''); }
}
