import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import smoothscroll from 'smoothscroll-polyfill';

if (environment.production) {
  enableProdMode();
}


// kick off the polyfill!
smoothscroll.polyfill();


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
