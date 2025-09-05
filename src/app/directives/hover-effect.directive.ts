import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverEffect]',
  standalone: true,
})
export class HoverEffectDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    // Add hover glow effect
    this.renderer.addClass(this.el.nativeElement, 'hover-glow');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.02)');
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'all 0.3s ease'
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    // Remove hover effects
    this.renderer.removeClass(this.el.nativeElement, 'hover-glow');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }
}
