import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FridgeRepository } from '../../domain/fridges/fridge.repository';
import { Fridge } from '../../domain/fridges/fridge.model';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpFridgeRepository implements FridgeRepository {
  private readonly apiUrl = `${environment.apiUrl}/fridge`;

  constructor(private http: HttpClient) {}

  fetchFridges(): Observable<Fridge[]> {
    return this.http.get<Fridge[]>(this.apiUrl);
  }

  createFridge(name: string): Observable<Fridge> {
    return this.http.post<Fridge>(this.apiUrl, { name });
  }
}
