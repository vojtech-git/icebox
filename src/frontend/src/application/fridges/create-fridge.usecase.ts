import { Injectable } from '@angular/core';
import { FridgeRepository } from '../../domain/fridges/fridge.repository';
import { FridgeDataStore } from '../../domain/fridges/fridge.data-store';
import { CreateFridgePresenter } from '../../domain/fridges/create-fridge.presenter';

@Injectable({ providedIn: 'root' })
export class CreateFridgeUseCase {
  constructor(
    private repository: FridgeRepository,
    private dataStore: FridgeDataStore,
    private presenter: CreateFridgePresenter,
  ) {}

  execute(name: string): void {
    if (!name || name.trim() === '') {
      this.presenter.presentCreationError('Fridge name cannot be empty');
      return;
    }

    this.presenter.presentCreationStarted();

    this.repository.createFridge(name).subscribe({
      next: (newFridge) => {
        this.dataStore.addFridge(newFridge);
        this.presenter.presentCreationSuccess();
      },
      error: (err) => this.presenter.presentCreationError(err.message),
    });
  }
}
