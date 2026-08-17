import { Signal } from "@angular/core";

export abstract class ICreateFridgePresenter {

  abstract readonly isCreating: Signal<boolean>;
  abstract readonly error: Signal<string | null>;

  abstract presentCreationStarted(): void;
  abstract presentCreationSuccess(): void;
  abstract presentCreationError(error: string): void;
}