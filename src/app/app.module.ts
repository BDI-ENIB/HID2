import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HistoryService } from './services/history.service';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AutomaticPageComponent } from './components/automatic-page/automatic-page.component';
import { ManualPageComponent } from './components/manual-page/manual-page.component';
import { LoggerComponent } from './components/logger/logger.component';
import { MapComponent } from './components/map/map.component';
import { PlotterComponent } from './components/plotter/plotter.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { ParameterComponent } from './components/parameter/parameter.component';
import { HistoryComponent } from './components/history/history.component';



const appRoutes: Routes = [
  { path: 'manual', component: ManualPageComponent },
  { path: '',       component: AutomaticPageComponent },
  { path: '**',     component: ErrorPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    AutomaticPageComponent,
    ManualPageComponent,
    LoggerComponent,
    MapComponent,
    PlotterComponent,
    ParametersComponent,
    ParameterComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    FormsModule
  ],
  providers: [
      HistoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
