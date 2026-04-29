import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, FileText, Image, Upload, Download, Trash2, Search, Filter } from 'lucide-angular';

import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {
  data = inject(DataService);
  readonly icons = { FileText, Image, Upload, Download, Trash2, Search, Filter };

  selectedCategory = signal<string>('All');

  categories = computed(() => {
    const set = new Set<string>(['All']);
    this.data.documents().forEach(d => set.add(d.category));
    return Array.from(set);
  });

  filtered = computed(() => {
    const c = this.selectedCategory();
    if (c === 'All') return this.data.documents();
    return this.data.documents().filter(d => d.category === c);
  });

  setCat(c: string) { this.selectedCategory.set(c); }

  iconFor(type: string) {
    return type === 'image' ? Image : FileText;
  }

  triggerUpload() {
    alert('In a production build, this would open a file picker. For demo purposes, the document list is preloaded.');
  }
}
