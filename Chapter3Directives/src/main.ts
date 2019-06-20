import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Chapter3DirectivesModule } from './app/chapter3-directives.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(Chapter3DirectivesModule)
  .catch(err => console.error(err));
