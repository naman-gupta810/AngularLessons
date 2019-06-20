import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appRefactoredHighligter]'
})
export class RefactoredHighligterDirective  implements OnInit{

  constructor(private elementref: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.elementref.nativeElement, 'background-color', 'green');
  }

}
