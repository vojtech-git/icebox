import { Injectable } from '@angular/core';
import { IFridgeRepository } from '../../domain/fridges/IFridgeRepository';
import { IFridgeDataStore } from '../../domain/fridges/IFridgeDataStore';
import { IGetAllFridgesPresenter } from '../../domain/fridges/IGetAllFridgesPresenter';

@Injectable({ providedIn: 'root' })
export class GetAllFridgesUseCase {
  constructor(
    private repository: IFridgeRepository,
    private dataStore: IFridgeDataStore,
    private presenter: IGetAllFridgesPresenter
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
      error: (err) => this.presenter.presentError(err.message)
    });
  }
}