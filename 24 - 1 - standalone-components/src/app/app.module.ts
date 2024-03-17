// Now that we have made the AppComponent standalone and changed main.ts to use
// bootstrapApplication(AppComponent), we no longer need this module.

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppComponent } from './app.component';
// // import { SharedModule } from './shared/shared.module';
// // import { DetailsComponent } from './welcome/details/details.component';
// import { WelcomeComponent } from './welcome/welcome.component';
// import { DetailsComponent } from './welcome/details/details.component';

// @NgModule({
//     declarations: [AppComponent], //, DetailsComponent],

//     // Can add standalone components here
//     imports: [
//         BrowserModule,
//         // SharedModule, // No longer needed because we made highlight directive standalone

//         // When WelcomeComponent was not standalone and DetailsComponent was, we needed to import
//         // DetailsComponent, but now that WelcomeComponent is standalone, we do not need to any more
//         // DetailsComponent,

//         WelcomeComponent
//     ], 
//     providers: [],
//     bootstrap: [AppComponent],
// })
// export class AppModule {}