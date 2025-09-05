import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appPulseAnimation]',
  standalone: true,
})
export class PulseAnimationDirective implements OnInit, OnDestroy {
  private intervalId?: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Add pulse animation class
    this.el.nativeElement.classList.add('pulse-animation');

    // Optional: Add random pulse intervals for more dynamic effect
    this.intervalId = window.setInterval(() => {
      this.el.nativeElement.style.animationDelay = Math.random() * 2 + 's';
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
