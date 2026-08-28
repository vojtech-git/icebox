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

  // Fridge Modal State
  isFridgeModalOpen = signal(false);
  newFridgeName = signal('');

  // Food Modal State
  isFoodModalOpen = signal(false);
  newFoodName = signal('');
  newFoodExpiration = signal('');
  activeFridgeId = signal<string | null>(null);

  ngOnInit(): void {
    this.fridgeService.loadAllFridges();
  }

  // Fridge Methods
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

  // Food Methods
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
}
