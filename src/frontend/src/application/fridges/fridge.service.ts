import { Injectable, signal, inject } from '@angular/core';
import { FridgeRepository } from '../../domain/fridges/fridge.repository';
import { Fridge } from '../../domain/fridges/fridge.model';

@Injectable({ providedIn: 'root' })
export class FridgeService {
  private repository = inject(FridgeRepository);

  readonly fridges = signal<Fridge[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  loadAllFridges(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.repository.fetchFridges().subscribe({
      next: (fridges) => {
        this.fridges.set(fridges);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.isLoading.set(false);
      },
    });
  }

  createFridge(name: string): void {
    this.repository.createFridge(name).subscribe({
      next: (newFridge) => {
        this.fridges.update((fridges) => [...fridges, newFridge]);
      },
      error: (err) => this.error.set(err.message),
    });
  }

  createFood(fridgeId: string, name: string, expirationDate: string): void {
    this.repository.createFood(fridgeId, name, expirationDate).subscribe({
      next: (newFood) => {
        this.fridges.update((fridges) =>
          fridges.map((fridge) =>
            fridge.id === fridgeId
              ? { ...fridge, foods: [...(fridge.foods || []), newFood] }
              : fridge,
          ),
        );
      },
      error: (err) => this.error.set(err.message),
    });
  }
}
