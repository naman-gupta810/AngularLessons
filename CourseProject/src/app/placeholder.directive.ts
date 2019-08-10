import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[rbPlaceholder]'
})
export class PlaceholderDirective {

  constructor(public vcRef: ViewContainerRef) { }

}
