import { Fridge } from './Fridge.model';

export abstract class IFridgeDataStore {
  abstract getFridges(): Fridge[];
  abstract setFridges(fridges: Fridge[]): void;
  abstract addFridge(fridge: Fridge): void;
}