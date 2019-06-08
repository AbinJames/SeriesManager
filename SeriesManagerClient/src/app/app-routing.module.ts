import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewSeriesComponent } from './series/view-series/view-series.component';

const routes: Routes = [
  //{ path: 'add-series', component: AddSe },
  { path: 'view-series', component: ViewSeriesComponent },
  { path: '', redirectTo: '/view-series', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
