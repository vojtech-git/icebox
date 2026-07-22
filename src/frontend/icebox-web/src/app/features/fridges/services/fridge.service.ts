import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FridgeDto, CreateFridgeCommand } from '../models/fridge.model';

@Injectable({ providedIn: 'root' })
export class FridgeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/fridge';

  getFridges(): Observable<FridgeDto[]> {
    return this.http.get<FridgeDto[]>(this.apiUrl);
  }

  createFridge(command: CreateFridgeCommand): Observable<FridgeDto> {
    return this.http.post<FridgeDto>(this.apiUrl, command);
  }
}