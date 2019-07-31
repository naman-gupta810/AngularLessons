import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[rbOpenDropDownMenu]',
  exportAs: 'rbOpenDropDownMenu'
})
export class OpenDropDownMenuDirective {

  @HostBinding('class.show') isShow = false;

  constructor() {
  }

  @HostListener('mouseenter') onMouseHover() {
    this.isShow = true;
  }

  @HostListener('mouseleave') onMouseOut() {
    this.isShow = false;
  }


}
