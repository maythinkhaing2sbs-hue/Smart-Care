import {
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Reveal directive — adds `is-visible` to any element with one of the
 * `sc-reveal*` / `sc-stagger` classes the moment it enters the viewport.
 *
 * Pure CSS handles the actual animation (transition from hidden → visible);
 * this just toggles the trigger class via IntersectionObserver so it works
 * in every browser, not just Chrome/Edge with animation-timeline support.
 */
@Directive({
  selector:
    '.sc-reveal, .sc-reveal-left, .sc-reveal-right, .sc-reveal-scale, .sc-reveal-blur, .sc-stagger',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const node = this.el.nativeElement;

    // Reduced-motion users: reveal instantly, skip observation.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('is-visible');
      return;
    }

    // Browsers without IntersectionObserver: reveal everything immediately.
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    // Run outside Angular to avoid triggering change detection on every scroll tick.
    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              this.observer?.unobserve(entry.target);
            }
          }
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -8% 0px',
        }
      );
      this.observer.observe(node);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
