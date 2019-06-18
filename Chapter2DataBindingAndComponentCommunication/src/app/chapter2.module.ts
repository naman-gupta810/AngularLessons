import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Chapter2RootComponent } from './chapter2-root.component';
import {FormsModule} from '@angular/forms';
import { ServerFormComponent } from './server/server-form/server-form.component';
import { ServerViewComponent } from './server/server-view/server-view.component';

@NgModule({
  declarations: [
    Chapter2RootComponent,
    ServerFormComponent,
    ServerViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [Chapter2RootComponent]
})
export class Chapter2Module { }
