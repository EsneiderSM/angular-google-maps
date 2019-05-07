import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapJsComponent } from './map-js/map-js.component';
import { MapAgmComponent } from './map-agm/map-agm.component';

const routes: Routes = [
  { path: 'map-js', component: MapJsComponent },
  { path: 'map-agm', component: MapAgmComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
