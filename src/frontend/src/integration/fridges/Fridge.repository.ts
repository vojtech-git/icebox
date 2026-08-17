import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFridgeRepository } from '../../domain/fridges/IFridgeRepository';
import { Fridge } from '../../domain/fridges/Fridge.model';
import { environment } from '../../environments/environment';

@Injectable()
export class FridgeRepository implements IFridgeRepository {
  private readonly apiUrl = `${environment.apiUrl}/fridge`;

  constructor(private http: HttpClient) {}

  fetchFridges(): Observable<Fridge[]> {
    return this.http.get<Fridge[]>(this.apiUrl);
  }

  createFridge(name: string): Observable<Fridge> {
    return this.http.post<Fridge>(this.apiUrl, { name });
  }
}