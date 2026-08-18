import { Signal } from '@angular/core';
import { Fridge } from './fridge.model';

export abstract class GetAllFridgesPresenter
{
  abstract readonly fridges: Signal<Fridge[]>;
  abstract readonly isLoading: Signal<boolean>;
  abstract readonly error: Signal<string | null>;

  abstract presentLoading(): void;
  abstract presentFridges(fridges: Fridge[]): void;
  abstract presentError(error: string): void;
}