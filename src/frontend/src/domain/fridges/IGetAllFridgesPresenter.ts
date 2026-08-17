import { Signal } from '@angular/core';
import { Fridge } from './Fridge.model';

export abstract class IGetAllFridgesPresenter {
  abstract readonly fridges: Signal<Fridge[]>;
  abstract readonly isLoading: Signal<boolean>;
  abstract readonly error: Signal<string | null>;

  abstract presentLoading(): void;
  abstract presentFridges(fridges: Fridge[]): void;
  abstract presentError(error: string): void;
}