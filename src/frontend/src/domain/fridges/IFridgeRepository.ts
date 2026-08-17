import { Observable } from 'rxjs';
import { Fridge } from './Fridge.model';

export abstract class IFridgeRepository {
  abstract fetchFridges(): Observable<Fridge[]>;
  abstract createFridge(name: string): Observable<Fridge>;
}