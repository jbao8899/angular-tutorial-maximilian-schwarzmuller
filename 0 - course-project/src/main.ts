import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// To deploy: 
// ng build
// firebase login
// firebase init > Hosting > dist/course-project/browser > single page > no automatic guilds > do not override index
// firebase deploy