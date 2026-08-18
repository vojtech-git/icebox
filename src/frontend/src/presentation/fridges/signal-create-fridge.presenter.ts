import { Injectable, signal } from '@angular/core';
import { CreateFridgePresenter } from '../../domain/fridges/create-fridge.presenter';

@Injectable({ providedIn: 'root' })
export class SignalCreateFridgePresenter implements CreateFridgePresenter
{
  readonly isCreating = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  presentCreationStarted(): void
  {
    this.isCreating.set(true);
    this.error.set(null);
  }

  presentCreationSuccess(): void
  {
    this.isCreating.set(false);
  }

  presentCreationError(error: string): void
  {
    this.error.set(error);
    this.isCreating.set(false);
  }
}