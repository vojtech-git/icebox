import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { FridgeRepository } from '../domain/fridges/fridge.repository';
import { FridgeDataStore } from '../domain/fridges/fridge.data-store';
import { GetAllFridgesPresenter } from '../domain/fridges/get-all-fridges.presenter';
import { HttpFridgeRepository } from '../integration/fridges/http-fridge.repository';
import { InMemoryFridgeStore } from '../integration/fridges/in-memory-fridge.store';
import { SignalGetAllFridgesPresenter } from '../presentation/fridges/signal-get-all-fridges.presenter';
import { CreateFridgePresenter } from '../domain/fridges/create-fridge.presenter';
import { SignalCreateFridgePresenter } from '../presentation/fridges/signal-create-fridge.presenter';
import { API_BASE_URL } from './app.tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: FridgeRepository, useClass: HttpFridgeRepository },
    { provide: FridgeDataStore, useClass: InMemoryFridgeStore },
    { provide: GetAllFridgesPresenter, useClass: SignalGetAllFridgesPresenter },
    { provide: CreateFridgePresenter, useClass: SignalCreateFridgePresenter },
    { provide: API_BASE_URL, useValue: 'http://localhost:8080/api' },
  ],
};
