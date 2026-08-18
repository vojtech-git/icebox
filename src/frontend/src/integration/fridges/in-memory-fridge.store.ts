import { Injectable } from '@angular/core';
import { FridgeDataStore } from '../../domain/fridges/fridge.data-store';
import { Fridge } from '../../domain/fridges/fridge.model';

@Injectable()
export class InMemoryFridgeStore implements FridgeDataStore
{
  private fridges: Fridge[] = [];

  getFridges(): Fridge[]
  {
    return this.fridges;
  }

  setFridges(fridges: Fridge[]): void
  {
    this.fridges = fridges;
  }

  addFridge(fridge: Fridge): void
  {
    const current = this.getFridges();
    this.setFridges([...current, fridge]);
  }
}