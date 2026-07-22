import { Component, OnInit, inject, signal } from '@angular/core';
import { FridgeService } from '../../services/fridge.service';
import { FridgeDto } from '../../models/fridge.model';
import { AddFridgePromptComponent } from '../add-fridge-prompt/add-fridge-prompt.component';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [AddFridgePromptComponent],
  template: `
    <div class="container">
      <h1>My Iceboxes</h1>
      <button (click)="showPrompt.set(true)">+ Add Fridge</button>

      @if (showPrompt()) {
        <app-add-fridge-prompt
          (fridgeAdded)="onFridgeAdded($event)"
          (cancelled)="showPrompt.set(false)" />
      }

      <div class="fridge-grid">
        @for (fridge of fridges(); track fridge.id) {
          <div class="fridge-card">
            <h3>{{ fridge.name }}</h3>
            <p>{{ fridge.foodIds.length }} items inside</p>
          </div>
        } @empty {
          <p>No fridges added yet. Create one above!</p>
        }
      </div>
    </div>
  `
})
export class MainScreenComponent implements OnInit {
  private fridgeService = inject(FridgeService);
  
  fridges = signal<FridgeDto[]>([]);
  showPrompt = signal(false);

  ngOnInit() {
    this.loadFridges();
  }

  loadFridges() {
    this.fridgeService.getFridges().subscribe({
      next: (data) => this.fridges.set(data),
      error: (err) => console.error('Failed to load fridges', err)
    });
  }

  onFridgeAdded(newFridge: FridgeDto) {
    this.fridges.update(list => [...list, newFridge]);
    this.showPrompt.set(false);
  }
}