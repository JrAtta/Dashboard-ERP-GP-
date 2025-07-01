import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { provideClientHydration } from '@angular/platform-browser';

PlotlyModule.plotlyjs = PlotlyJS;
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' }),withHashLocation(),
  ),
  // provideClientHydration(), //  انا مش شغال ssr  هنا 
  importProvidersFrom(PlotlyModule),

  ],
};
