import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DirectiveRootComponent } from './directive-root.component';
import {BasicHighlightDirective} from './custom-directives/basic-highlight.directive';
import { RefactoredHighligterDirective } from './custom-directives/refactored-highligter.directive';
import { ReactiveDirectiveDirective } from './custom-directives/reactive-directive.directive';
import { BetterHighlightDirective } from './custom-directives/better-highlight.directive';
import { ReverseIfDirective } from './custom-directives/reverse-if.directive';

@NgModule({
  declarations: [
    DirectiveRootComponent,
    BasicHighlightDirective,
    RefactoredHighligterDirective,
    ReactiveDirectiveDirective,
    BetterHighlightDirective,
    ReverseIfDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [DirectiveRootComponent]
})
export class Chapter3DirectivesModule { }
