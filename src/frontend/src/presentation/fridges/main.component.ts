import { Component, OnInit, inject, signal } from '@angular/core';
import { FridgeService } from '../../application/fridges/fridge.service';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  fridgeService = inject(FridgeService);

  // Create Fridge State
  isFridgeModalOpen = signal(false);
  newFridgeName = signal('');

  // Edit Fridge State
  isEditFridgeModalOpen = signal(false);
  editFridgeId = signal<string | null>(null);
  editFridgeName = signal('');

  // Create Food State
  isFoodModalOpen = signal(false);
  newFoodName = signal('');
  newFoodExpiration = signal('');
  activeFridgeId = signal<string | null>(null);

  // Edit Food State
  isEditFoodModalOpen = signal(false);
  editFoodId = signal<string | null>(null);
  editFoodFridgeId = signal<string | null>(null);
  editFoodName = signal('');
  editFoodExpiration = signal('');

  ngOnInit(): void {
    this.fridgeService.loadAllFridges();
  }

  // --- Fridge Methods ---

  openCreateFridgeModal(): void {
    this.newFridgeName.set('');
    this.isFridgeModalOpen.set(true);
  }

  closeModal(): void {
    this.isFridgeModalOpen.set(false);
  }

  confirmCreateFridge(): void {
    const name = this.newFridgeName().trim();
    if (name) {
      this.fridgeService.createFridge(name);
    }
    this.closeModal();
  }

  openEditFridgeModal(fridgeId: string, currentName: string): void {
    this.editFridgeId.set(fridgeId);
    this.editFridgeName.set(currentName);
    this.isEditFridgeModalOpen.set(true);
  }

  closeEditFridgeModal(): void {
    this.isEditFridgeModalOpen.set(false);
    this.editFridgeId.set(null);
  }

  confirmEditFridge(): void {
    const id = this.editFridgeId();
    const name = this.editFridgeName().trim();
    if (id && name) {
      this.fridgeService.updateFridge(id, name);
    }
    this.closeEditFridgeModal();
  }

  deleteFridge(id: string): void {
    this.fridgeService.deleteFridge(id);
  }

  // --- Food Methods ---

  openCreateFoodModal(fridgeId: string): void {
    this.activeFridgeId.set(fridgeId);
    this.newFoodName.set('');
    this.newFoodExpiration.set('');
    this.isFoodModalOpen.set(true);
  }

  closeFoodModal(): void {
    this.isFoodModalOpen.set(false);
    this.activeFridgeId.set(null);
  }

  confirmCreateFood(): void {
    const fridgeId = this.activeFridgeId();
    const name = this.newFoodName().trim();
    const expiration = this.newFoodExpiration().trim();

    if (fridgeId && name && expiration) {
      this.fridgeService.createFood(fridgeId, name, expiration);
    }
    this.closeFoodModal();
  }

  openEditFoodModal(fridgeId: string, food: any): void {
    this.editFoodFridgeId.set(fridgeId);
    this.editFoodId.set(food.id);
    this.editFoodName.set(food.name);
    this.editFoodExpiration.set(food.expirationDate);
    this.isEditFoodModalOpen.set(true);
  }

  closeEditFoodModal(): void {
    this.isEditFoodModalOpen.set(false);
    this.editFoodId.set(null);
    this.editFoodFridgeId.set(null);
  }

  confirmEditFood(): void {
    const fridgeId = this.editFoodFridgeId();
    const foodId = this.editFoodId();
    const name = this.editFoodName().trim();
    const expiration = this.editFoodExpiration().trim();

    if (fridgeId && foodId && name && expiration) {
      this.fridgeService.updateFood(fridgeId, foodId, name, expiration);
    }
    this.closeEditFoodModal();
  }

  deleteFood(fridgeId: string, foodId: string): void {
    this.fridgeService.deleteFood(fridgeId, foodId);
  }
}
