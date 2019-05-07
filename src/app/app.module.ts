import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core'
import { ReactiveFormsModule } from '@angular/forms';
import { MapJsComponent } from './map-js/map-js.component';
import { MapAgmComponent } from './map-agm/map-agm.component';

@NgModule({
  declarations: [
    AppComponent,
    MapJsComponent,
    MapAgmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBOViQrdejQi2ipitN0exoueX9r_fnWj80',
      libraries: ["places"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
