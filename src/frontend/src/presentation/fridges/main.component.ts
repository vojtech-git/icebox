import { Component, OnInit, inject } from '@angular/core';
import { GetAllFridgesUseCase } from '../../application/fridges/get-all-fridges.usecase';
import { GetAllFridgesPresenter } from '../../domain/fridges/get-all-fridges.presenter';
import { CreateFridgeUseCase } from '../../application/fridges/create-fridge.usecase';
import { CreateFridgePresenter } from '../../domain/fridges/create-fridge.presenter';

@Component({
  selector: 'app-main',
  standalone: true,
  template: `
    <div>
      <input #newFridgeName type="text" placeholder="New fridge name" />
      <button
        (click)="createFridge(newFridgeName.value); newFridgeName.value = ''"
        [disabled]="createPresenter.isCreating()"
      >
        Add Fridge
      </button>
    </div>

    @if (createPresenter.error()) {
      <div class="error">{{ createPresenter.error() }}</div>
    }

    @if (getAllPresenter.isLoading()) {
      <div>Loading...</div>
    }
    @if (getAllPresenter.error()) {
      <div class="error">{{ getAllPresenter.error() }}</div>
    }

    <div class="board">
      @for (fridge of getAllPresenter.fridges(); track fridge.id) {
        <div class="fridge-column">{{ fridge.name }}</div>
      }
    </div>
  `,
})
export class MainComponent implements OnInit {
  getAllPresenter = inject(GetAllFridgesPresenter);
  createPresenter = inject(CreateFridgePresenter);

  private getAllUseCase = inject(GetAllFridgesUseCase);
  private createUseCase = inject(CreateFridgeUseCase);

  ngOnInit(): void {
    this.getAllUseCase.execute();
  }

  createFridge(name: string): void {
    this.createUseCase.execute(name);
    setTimeout(() => this.getAllUseCase.execute(), 100);
  }
}
