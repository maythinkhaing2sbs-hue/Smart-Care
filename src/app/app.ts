import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModalComponent } from './shared/auth-modal/auth-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
