import { Injectable } from '@angular/core';
import { IFridgeRepository } from '../../domain/fridges/IFridgeRepository';
import { IFridgeDataStore } from '../../domain/fridges/IFridgeDataStore';
import { ICreateFridgePresenter } from '../../domain/fridges/ICreateFridgePresenter';

@Injectable({ providedIn: 'root' })
export class CreateFridgeUseCase {
  constructor(
    private repository: IFridgeRepository,
    private dataStore: IFridgeDataStore,
    private presenter: ICreateFridgePresenter
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
      error: (err) => this.presenter.presentCreationError(err.message)
    });
  }
}