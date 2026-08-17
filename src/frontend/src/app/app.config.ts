import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { IFridgeRepository } from '../domain/fridges/IFridgeRepository';
import { IFridgeDataStore } from '../domain/fridges/IFridgeDataStore';
import { IGetAllFridgesPresenter } from '../domain/fridges/IGetAllFridgesPresenter';
import { FridgeRepository } from '../integration/fridges/Fridge.repository';
import { FridgeStore } from '../integration/fridges/Fridge.store';
import { GetAllFridgesPresenter } from '../presentation/fridges/GetAllFridges.presenter';

import { ICreateFridgePresenter } from '../domain/fridges/ICreateFridgePresenter';
import { CreateFridgePresenter } from '../presentation/fridges/CreateFridge.presenter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: IFridgeRepository, useClass: FridgeRepository },
    { provide: IFridgeDataStore, useClass: FridgeStore },
    { provide: IGetAllFridgesPresenter, useClass: GetAllFridgesPresenter },
    { provide: ICreateFridgePresenter, useClass: CreateFridgePresenter }
  ]
};