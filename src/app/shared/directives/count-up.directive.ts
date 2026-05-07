import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Count-up directive — animates a numeric element from 0 to its target value
 * the moment it scrolls into view.
 *
 * Usage:
 *   <span [appCountUp]="'120+'"></span>
 *   <span [appCountUp]="'4.9'" [duration]="1500"></span>
 *
 * Parses the value into { number, suffix } so labels like "120+", "50K+",
 * "4.9/5", "15+" all work — the suffix is preserved verbatim.
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input('appCountUp') target: string | number = '0';
  @Input() duration = 1800;

  private el = inject(ElementRef<HTMLElement>);
  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);
  private observer?: IntersectionObserver;
  private rafId?: number;

  ngOnInit(): void {
    const node = this.el.nativeElement;
    const targetStr = String(this.target);

    // Parse "120+" → number 120, suffix "+". Handles decimals + alpha suffixes (e.g. "50K+").
    const match = targetStr.match(/^(\d+\.?\d*)(.*)$/);
    if (!match) {
      node.textContent = targetStr;
      return;
    }
    const targetNum = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = (match[1].split('.')[1] || '').length;

    // SSR / non-browser: render the final value directly.
    if (!isPlatformBrowser(this.platformId)) {
      node.textContent = targetStr;
      return;
    }

    // Reduced motion: skip the count-up; show final value.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = targetStr;
      return;
    }

    // No IntersectionObserver: just show final value.
    if (typeof IntersectionObserver === 'undefined') {
      node.textContent = targetStr;
      return;
    }

    // Initial state: "0" + suffix (e.g. "0+", "0K+").
    node.textContent = this.format(0, decimals) + suffix;

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.observer?.unobserve(entry.target);
              this.runCountUp(targetNum, suffix, decimals, this.duration);
            }
          }
        },
        { threshold: 0.4 }
      );
      this.observer.observe(node);
    });
  }

  private runCountUp(target: number, suffix: string, decimals: number, duration: number) {
    const start = performance.now();
    const node = this.el.nativeElement;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic — quick start, gentle settle
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      node.textContent = this.format(current, decimals) + suffix;

      if (progress < 1) {
        this.rafId = requestAnimationFrame(tick);
      }
    };

    this.rafId = requestAnimationFrame(tick);
  }

  private format(value: number, decimals: number): string {
    if (decimals > 0) return value.toFixed(decimals);
    return Math.round(value).toString();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.rafId !== undefined) cancelAnimationFrame(this.rafId);
  }
}
