import { Injectable } from '@angular/core';
import { FridgeRepository } from '../../domain/fridges/fridge.repository';
import { FridgeDataStore } from '../../domain/fridges/fridge.data-store';
import { GetAllFridgesPresenter } from '../../domain/fridges/get-all-fridges.presenter';

@Injectable({ providedIn: 'root' })
export class GetAllFridgesUseCase {
  constructor(
    private repository: FridgeRepository,
    private dataStore: FridgeDataStore,
    private presenter: GetAllFridgesPresenter,
  ) {}

  execute(): void {
    const cachedFridges = this.dataStore.getFridges();

    if (cachedFridges.length > 0) {
      this.presenter.presentFridges(cachedFridges);
    } else {
      this.presenter.presentLoading();
    }

    this.repository.fetchFridges().subscribe({
      next: (fridges) => {
        this.dataStore.setFridges(fridges);
        this.presenter.presentFridges(fridges);
      },
      error: (err) => this.presenter.presentError(err.message),
    });
  }
}
