import { Fridge } from './fridge.model';

export abstract class FridgeDataStore
{
  abstract getFridges(): Fridge[];
  abstract setFridges(fridges: Fridge[]): void;
  abstract addFridge(fridge: Fridge): void;
}