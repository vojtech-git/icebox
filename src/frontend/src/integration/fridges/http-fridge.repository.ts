import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FridgeRepository } from '../../domain/fridges/fridge.repository';
import { Fridge } from '../../domain/fridges/fridge.model';
import { Food } from '../../domain/fridges/food.model';
import { API_BASE_URL } from '../../app/app.tokens';

@Injectable()
export class HttpFridgeRepository implements FridgeRepository {
  private readonly fridgeUrl = `${inject(API_BASE_URL)}/fridge`;
  private readonly foodUrl = `${inject(API_BASE_URL)}/food`;

  constructor(private http: HttpClient) {}

  fetchFridges(): Observable<Fridge[]> {
    return this.http.get<Fridge[]>(this.fridgeUrl);
  }

  createFridge(name: string): Observable<Fridge> {
    return this.http.post<Fridge>(this.fridgeUrl, { name });
  }

  createFood(
    fridgeId: string,
    name: string,
    expirationDate: string,
  ): Observable<Food> {
    return this.http.post<Food>(this.foodUrl, {
      fridgeId,
      name,
      expirationDate,
    });
  }

  updateFridge(id: string, name: string): Observable<Fridge> {
    return this.http.patch<Fridge>(`${this.fridgeUrl}/${id}`, { name });
  }

  deleteFridge(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.fridgeUrl}/${id}`);
  }

  updateFood(
    id: string,
    name: string,
    expirationDate: string,
  ): Observable<Food> {
    return this.http.patch<Food>(`${this.foodUrl}/${id}`, {
      name,
      expirationDate,
    });
  }

  deleteFood(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.foodUrl}/${id}`);
  }
}
