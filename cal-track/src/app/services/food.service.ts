import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Food } from '../models/food.modesl';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private API_BASE: string;

  constructor(private http: HttpClient) {
    this.API_BASE = `${environment.API_BASE}/food`;
  }

  getFoods() {
    return this.http.get<Food[]>(`${this.API_BASE}`);
  }
}
