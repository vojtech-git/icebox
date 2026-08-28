import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { FridgeRepository } from '../domain/fridges/fridge.repository';
import { HttpFridgeRepository } from '../integration/fridges/http-fridge.repository';
import { API_BASE_URL } from './app.tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: FridgeRepository, useClass: HttpFridgeRepository },
    { provide: API_BASE_URL, useValue: 'http://localhost:8080/api' },
  ],
};
