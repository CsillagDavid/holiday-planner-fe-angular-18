import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TokenInterceptor } from './interceptors/token-interceptor.component';
import { provideStore } from '@ngrx/store';
import { appReducers } from './store/reducers/app.reducer';
import { CrudStateService } from './services/crud-state.service';
import { ActionStateService } from './services/action-state.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(withInterceptors([AuthInterceptor, TokenInterceptor])), provideStore(appReducers),
    CrudStateService, ActionStateService]
};
