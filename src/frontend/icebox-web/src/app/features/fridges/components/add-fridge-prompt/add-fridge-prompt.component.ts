import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FridgeService } from '../../services/fridge.service';
import { FridgeDto } from '../../models/fridge.model';

@Component({
  selector: 'app-add-fridge-prompt',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="modal">
      <h3>Add New Fridge</h3>
      <input type="text" [(ngModel)]="fridgeName" placeholder="Fridge Name" />
      <button (click)="submit()">Confirm</button>
      <button (click)="cancelled.emit()">Cancel</button>
    </div>
  `
})
export class AddFridgePromptComponent {
  private fridgeService = inject(FridgeService);
  fridgeName = '';

  @Output() fridgeAdded = new EventEmitter<FridgeDto>();
  @Output() cancelled = new EventEmitter<void>();

  submit() {
    if (!this.fridgeName.trim()) return;

    this.fridgeService.createFridge({ name: this.fridgeName }).subscribe({
      next: (newFridge) => {
        this.fridgeAdded.emit(newFridge);
        this.fridgeName = '';
      },
      error: (err) => console.error('Failed to add fridge', err)
    });
  }
}