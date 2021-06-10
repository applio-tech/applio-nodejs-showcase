import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RoomComponent } from './room/room.component';
import { TemperatureComponent } from './temperature/temperature.component';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { HomeComponent } from './home/home.component';
import { OverwievComponent } from './overwiev/overwiev.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    TemperatureComponent,
    HomeComponent,
    OverwievComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
     HttpClientModule,
    AppRoutingModule,
    MatMenuModule,
    MatCardModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
