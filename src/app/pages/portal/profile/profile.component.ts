import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, User, Mail, Phone, MapPin, Calendar, Camera, Save, Bell, Lock, Shield, Globe } from 'lucide-angular';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  auth = inject(AuthService);
  readonly icons = { User, Mail, Phone, MapPin, Calendar, Camera, Save, Bell, Lock, Shield, Globe };

  saved = signal(false);

  // Form fields seeded from auth user
  name = signal(this.auth.user()?.name ?? '');
  email = signal(this.auth.user()?.email ?? '');
  phone = signal(this.auth.user()?.phone ?? '');
  dob = signal('1995-03-12');
  gender = signal('Female');
  country = signal('Myanmar');
  address = signal('Yangon, Myanmar');
  bloodGroup = signal('O+');
  allergies = signal('Penicillin');
  conditions = signal('None');

  notifEmail = signal(true);
  notifSms = signal(true);
  notifPush = signal(false);

  saveProfile() {
    this.auth.updateProfile({
      name: this.name(),
      email: this.email(),
      phone: this.phone()
    });
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2400);
  }
}
