import { Observable } from 'rxjs';
import { Fridge } from './fridge.model';

export abstract class FridgeRepository {
  abstract fetchFridges(): Observable<Fridge[]>;
  abstract createFridge(name: string): Observable<Fridge>;
}
