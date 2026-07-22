import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FridgeService } from '../../services/fridge.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fridge-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './fridge-detail.html',
  styleUrl: './fridge-detail.css'
})
export class FridgeDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private fridgeService = inject(FridgeService);

  fridge = signal<any>(null);
  foods = signal<any[]>([]);
  fridgeId = '';

  ngOnInit() {
    this.fridgeId = this.route.snapshot.paramMap.get('id') || '';
    this.loadFridge();
  }

  loadFridge() {
    if (this.fridgeId) {
      this.fridgeService.getFridgeById(this.fridgeId).subscribe(fridgeData => {
        this.fridge.set(fridgeData);
        this.loadFoods(fridgeData.foodIds);
      });
    }
  }

  loadFoods(foodIds: string[]) {
    this.foods.set([]);
    if (!foodIds) return;

    for (const id of foodIds) {
      this.fridgeService.getFoodById(id).subscribe(food => {
        this.foods.update(currentFoods => [...currentFoods, food]);
      });
    }
  }

  addNewItem() {
    const itemName = prompt('What are you putting in the fridge?');
    if (itemName && itemName.trim() !== '') {
      this.fridgeService.addFood(this.fridgeId, itemName).subscribe(() => this.loadFridge());
    }
  }

  consumeItem(itemId: string) {
    this.fridgeService.removeFood(itemId).subscribe(() => this.loadFridge());
  }
}