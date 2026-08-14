import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FridgeDto, CreateFridgeCommand } from '../models/fridge.model';

@Injectable({ providedIn: 'root' })
export class FridgeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://192.168.1.105:8080/api/fridge';
  private foodUrl = 'http://192.168.1.105:8080/api/food';

  getFridges(): Observable<FridgeDto[]> {
    return this.http.get<FridgeDto[]>(this.apiUrl);
  }

  createFridge(command: CreateFridgeCommand): Observable<FridgeDto> {
    return this.http.post<FridgeDto>(this.apiUrl, command);
  }

  deleteFridge(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  renameFridge(id: string, newName: string) {
    return this.http.patch(`${this.apiUrl}/${id}`, { name: newName });
  }

  getFridgeById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addFood(fridgeId: string, itemName: string) {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    
    return this.http.post(this.foodUrl, { 
      fridgeId: fridgeId, 
      name: itemName,
      expirationDate: expiry.toISOString() 
    });
  }

  removeFood(itemId: string) {
    return this.http.delete(`${this.foodUrl}/${itemId}`);
  }

  getFoodById(foodId: string) {
    return this.http.get<any>(`${this.foodUrl}/${foodId}`);
  }
}