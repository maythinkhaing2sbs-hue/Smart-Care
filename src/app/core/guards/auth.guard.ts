import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UiService } from '../services/ui.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const ui = inject(UiService);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;

  ui.redirectAfterAuth.set(state.url);
  ui.openAuth('login');
  return router.parseUrl('/');
};
