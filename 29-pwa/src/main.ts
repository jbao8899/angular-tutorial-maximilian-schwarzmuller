import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// ng add @angular/pwa
// ng build --configuration production // Must rebuild for changes to reflect in server
// ng serve --configuration production
// npm install -g http-server // to host a local server for this project
// http-server -p 8080 -c-1 dist/29-pwa/browser
// Go to http://localhost:8080/

// THIS PROJECT WAS OUTDATED WHEN I MADE IT, IT DOES NOT REALLY WORK. The posts do not
// seem to get cached for offline mode, but the http-server instances do not
// go away after pressing Ctrl + C as they are supposed to, until you uninstall the
// package and delete the page data from the browser.

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
