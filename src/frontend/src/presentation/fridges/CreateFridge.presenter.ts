// src/presentation/fridges/CreateFridge.presenter.ts
import { Injectable, signal } from '@angular/core';
import { ICreateFridgePresenter } from '../../domain/fridges/ICreateFridgePresenter';

@Injectable({ providedIn: 'root' })
export class CreateFridgePresenter implements ICreateFridgePresenter {
  readonly isCreating = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  presentCreationStarted(): void {
    this.isCreating.set(true);
    this.error.set(null);
  }

  presentCreationSuccess(): void {
    this.isCreating.set(false);
  }

  presentCreationError(error: string): void {
    this.error.set(error);
    this.isCreating.set(false);
  }
}