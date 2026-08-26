import { Injectable, signal } from '@angular/core';
import { GetAllFridgesPresenter } from '../../domain/fridges/get-all-fridges.presenter.js';
import { Fridge } from '../../domain/fridges/fridge.model.js';

@Injectable()
export class SignalGetAllFridgesPresenter implements GetAllFridgesPresenter {
  readonly fridges = signal<Fridge[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  presentLoading(): void {
    this.isLoading.set(true);
    this.error.set(null);
  }

  presentFridges(fridges: Fridge[]): void {
    this.fridges.set(fridges);
    this.isLoading.set(false);
  }

  presentError(error: string): void {
    this.error.set(error);
    this.isLoading.set(false);
  }
}
