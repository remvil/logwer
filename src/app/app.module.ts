import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatsHeaderComponent } from './components/stats-header/stats-header.component';
import { FiltersFormComponent } from './components/filters-form/filters-form.component';
import { DocumentTableComponent } from './components/document-table/document-table.component';

@NgModule({
  declarations: [
    AppComponent,
    StatsHeaderComponent,
    FiltersFormComponent,
    DocumentTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
