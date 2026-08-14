import { Component, OnInit, inject, signal } from '@angular/core';
import { FridgeService } from '../../services/fridge.service';
import { FridgeDto } from '../../models/fridge.model';
import { AddFridgePromptComponent } from '../add-fridge-prompt/add-fridge-prompt.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  styleUrl: './main-screen.component.css',
  imports: [RouterLink, AddFridgePromptComponent],
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
            <a [routerLink]="['/fridge', fridge.id]">Open Fridge</a>
            <br>
            <button (click)="renameFridge(fridge.id)">Rename</button>
            <button (click)="removeFridge(fridge.id)">Delete</button>
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

  removeFridge(id: string) {
    if (confirm('Are you sure you want to delete this fridge?')) {
      this.fridgeService.deleteFridge(id).subscribe(() => this.loadFridges());
    }
  }

  renameFridge(id: string) {
    const newName = prompt('Enter new fridge name:');
    if (newName && newName.trim() !== '') {
      this.fridgeService.renameFridge(id, newName).subscribe(() => this.loadFridges());
    }
  }
}