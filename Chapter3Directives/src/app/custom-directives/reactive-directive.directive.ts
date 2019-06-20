import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appReactiveDirective]'
})
export class ReactiveDirectiveDirective {
  @HostBinding('style.color') textColor: string;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseHover() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'red');
    this.textColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.textColor = 'black';
  }
}
