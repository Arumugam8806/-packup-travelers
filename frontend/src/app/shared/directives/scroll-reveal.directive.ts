import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '.reveal',
  standalone: false
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;

    // If IntersectionObserver is not supported,
    // immediately show the element.
    if (typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(element, 'reveal-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(
              element,
              'reveal-visible'
            );

            this.observer?.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
      }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}