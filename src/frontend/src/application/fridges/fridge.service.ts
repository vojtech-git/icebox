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

  updateFridge(id: string, name: string): void {
    this.repository.updateFridge(id, name).subscribe({
      next: (updated) =>
        this.fridges.update((fs) =>
          fs.map((f) => (f.id === id ? { ...f, name: updated.name } : f)),
        ),
      error: (err) => this.error.set(err.message),
    });
  }

  deleteFridge(id: string): void {
    this.repository.deleteFridge(id).subscribe({
      next: () => this.fridges.update((fs) => fs.filter((f) => f.id !== id)),
      error: (err) => this.error.set(err.message),
    });
  }

  updateFood(
    fridgeId: string,
    foodId: string,
    name: string,
    expirationDate: string,
  ): void {
    this.repository.updateFood(foodId, name, expirationDate).subscribe({
      next: (updatedFood) => {
        this.fridges.update((fs) =>
          fs.map((f) =>
            f.id === fridgeId
              ? {
                  ...f,
                  foods: f.foods.map((food) =>
                    food.id === foodId ? updatedFood : food,
                  ),
                }
              : f,
          ),
        );
      },
      error: (err) => this.error.set(err.message),
    });
  }

  deleteFood(fridgeId: string, foodId: string): void {
    this.repository.deleteFood(foodId).subscribe({
      next: () => {
        this.fridges.update((fs) =>
          fs.map((f) =>
            f.id === fridgeId
              ? { ...f, foods: f.foods.filter((food) => food.id !== foodId) }
              : f,
          ),
        );
      },
      error: (err) => this.error.set(err.message),
    });
  }
}
