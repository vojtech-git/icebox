import { Component, OnInit, inject } from '@angular/core';
import { FridgeService } from '../../application/fridges/fridge.service';

@Component({
  selector: 'app-main',
  standalone: true,
  styles: [
    `
      .board {
        display: flex;
        overflow-x: auto;
        gap: 1rem;
        padding: 1rem;
        height: calc(100vh - 100px);
      }
      .fridge-column {
        min-width: 300px;
        background: var(--surface);
        border-radius: var(--radius);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        box-shadow: var(--shadow-sm);
      }
      .fridge-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        font-weight: bold;
      }
      .foods-list {
        overflow-y: auto;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .food-item {
        border: 1px solid var(--border);
        border-radius: 6px;
        padding: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .food-info {
        display: flex;
        flex-direction: column;
      }
      .food-date {
        font-size: 0.8rem;
        color: var(--text-muted);
      }
      .actions button {
        padding: 0.2rem 0.5rem;
        margin-left: 0.2rem;
        margin-right: 0;
        font-size: 0.8rem;
      }
      .add-food-btn {
        margin-top: 1rem;
        width: 100%;
        padding: 0.5rem;
        border: 2px dashed var(--border);
        border-radius: 6px;
        background: transparent;
        color: var(--text-muted);
        cursor: pointer;
      }
      .add-fridge-column-btn {
        min-width: 300px;
        font-size: 2rem;
        background: transparent;
        border: 2px dashed var(--border);
        color: var(--text-muted);
        cursor: pointer;
        border-radius: var(--radius);
      }
    `,
  ],
  template: `
    @if (fridgeService.isLoading()) {
      <div>Loading...</div>
    }
    @if (fridgeService.error()) {
      <div class="error">{{ fridgeService.error() }}</div>
    }

    <div class="board">
      @for (fridge of fridgeService.fridges(); track fridge.id) {
        <div class="fridge-column">
          <div class="fridge-header">
            <span>{{ fridge.name }}</span>
            <div class="actions">
              <button>E</button>
              <button>X</button>
            </div>
          </div>

          <div class="foods-list">
            @for (food of fridge.foods; track food.id) {
              <div class="food-item">
                <div class="food-info">
                  <span>{{ food.name }}</span>
                  <span class="food-date">{{ food.expirationDate }}</span>
                </div>
                <div class="actions">
                  <button>E</button>
                  <button>X</button>
                </div>
              </div>
            }
          </div>

          <button class="add-food-btn">+</button>
        </div>
      }

      <button class="add-fridge-column-btn">+</button>
    </div>
  `,
})
export class MainComponent implements OnInit {
  fridgeService = inject(FridgeService);

  ngOnInit(): void {
    this.fridgeService.loadAllFridges();
  }
}
