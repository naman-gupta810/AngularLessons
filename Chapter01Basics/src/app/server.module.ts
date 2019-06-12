import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HomePageComponent} from './home-page.component';
import {ServerListComponent} from './servers/server-list/server-list.component';
import {ServerComponent} from './servers/server/server.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    HomePageComponent,
    ServerListComponent,
    ServerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [HomePageComponent]
})
export class ServerModule {
}
