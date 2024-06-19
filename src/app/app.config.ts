import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';

import {routes} from './app.routes';
import {provideEcharts} from "ngx-echarts";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBarModule} from "@angular/material/snack-bar";

export const appConfig: ApplicationConfig = {
    providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideHttpClient(), provideEcharts(), importProvidersFrom([BrowserModule, BrowserAnimationsModule, MatIconModule, MatSnackBarModule]),],

};
