import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomComponent } from './room/room.component';
import { HomeComponent } from './home/home.component';
import {TemperatureComponent } from './temperature/temperature.component';
import {OverwievComponent } from './overwiev/overwiev.component';

const routes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'overwiev', component: OverwievComponent },
  { path: 'occupations', component: RoomComponent },
  { path: 'temperature', component: TemperatureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
