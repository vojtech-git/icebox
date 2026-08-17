import { Injectable } from '@angular/core';
import { IFridgeDataStore } from '../../domain/fridges/IFridgeDataStore';
import { Fridge } from '../../domain/fridges/Fridge.model';

@Injectable()
export class FridgeStore implements IFridgeDataStore {
  private fridges: Fridge[] = [];

  getFridges(): Fridge[] {
    return this.fridges;
  }

  setFridges(fridges: Fridge[]): void {
    this.fridges = fridges;
  }

  addFridge(fridge: Fridge): void {
    const current = this.getFridges();
    this.setFridges([...current, fridge]);
  }
}