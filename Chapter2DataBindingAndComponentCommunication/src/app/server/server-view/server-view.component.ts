import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked,
  AfterViewInit,
  Component, ContentChild,
  DoCheck, ElementRef,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'ch-server-view',
  templateUrl: './server-view.component.html',
  styleUrls: ['./server-view.component.css']
})
export class ServerViewComponent implements OnInit, OnChanges,
  DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() element: {
    name: string,
    type: string,
    content: string
  };

  @ContentChild('contentParagraph', {static: true })contentParagraph: ElementRef;
  constructor() {
    console.log('Constructor called');
  }

  ngOnInit() {
    console.log('ngOnInit Called');
    console.log(this.contentParagraph);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called');
    console.log(changes);
  }

  ngDoCheck(): void {
    console.log('DoCheck Called');
  }

  ngAfterContentInit(): void {
    console.log('After Content init Called');
  }

  ngAfterContentChecked(): void {
      console.log('After Content Checked Called');
  }

  ngAfterViewInit(): void {
    console.log('After View Init Called');
  }

  ngOnDestroy(): void {
    console.log('Destroy Called');
  }

  ngAfterViewChecked(): void {
    console.log('After View Checked Called');
  }

}
