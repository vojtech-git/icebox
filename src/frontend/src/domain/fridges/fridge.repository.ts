import { Observable } from 'rxjs';
import { Fridge } from './fridge.model';
import { Food } from './food.model';

export abstract class FridgeRepository {
  abstract fetchFridges(): Observable<Fridge[]>;
  abstract createFridge(name: string): Observable<Fridge>;
  abstract createFood(
    fridgeId: string,
    name: string,
    expirationDate: string,
  ): Observable<Food>;
}
