import { Injectable, signal } from '@angular/core';
import { IGetAllFridgesPresenter } from '../../domain/fridges/IGetAllFridgesPresenter';
import { Fridge } from '../../domain/fridges/Fridge.model';

@Injectable()
export class GetAllFridgesPresenter implements IGetAllFridgesPresenter {
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