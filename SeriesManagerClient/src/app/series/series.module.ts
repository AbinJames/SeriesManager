import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSeriesComponent } from './view-series/view-series.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SeriesFilterPipe } from './series-filter.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddSeriesComponent } from './add-series/add-series.component';

@NgModule({
  declarations: [ViewSeriesComponent, SeriesFilterPipe, AddSeriesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ModalModule.forRoot()
  ]
})
export class SeriesModule { }
