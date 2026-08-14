import { Routes } from '@angular/router';
import { MainScreenComponent } from './features/fridges/components/main-screen/main-screen.component';
import { FridgeDetail } from './features/fridges/components/fridge-detail/fridge-detail';

export const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'fridge/:id', component: FridgeDetail }
];