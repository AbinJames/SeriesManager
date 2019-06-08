import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { CommonPageModule } from './commonPage/common-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageModule } from './commonPage/home-page/home-page.module';
import { SeriesModule } from './series/series.module';
import { SeriesService } from './series/series.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ModalContentComponent } from './commonPage/modal-content/modal-content.component';
import { AddSeriesComponent } from './series/add-series/add-series.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalContentComponent
  ],
  entryComponents: [ModalContentComponent, AddSeriesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonPageModule,
    HomePageModule,
    BrowserAnimationsModule,
    SeriesModule,
    AngularFontAwesomeModule
  ],
  providers: [
    AppComponent,
    SeriesService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
