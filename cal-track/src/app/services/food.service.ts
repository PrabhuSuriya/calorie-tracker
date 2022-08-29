import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Food } from '../models/food.models';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private API_BASE: string;

  constructor(private http: HttpClient) {
    this.API_BASE = `${environment.API_BASE}/food`;
  }

  getFoods() {
    return this.http
      .get<Food[]>(`${this.API_BASE}`)
      .pipe(
        map((data) =>
          data.map((f) => ({ ...f, consumedTime: new Date(f.consumedTime) }))
        )
      );
  }

  addFood(food: Food) {
    return this.http.post<Food>(`${this.API_BASE}`, food);
  }

  getAllFoods() {
    return this.http
      .get<Food[]>(`${this.API_BASE}/all`)
      .pipe(
        map((data) =>
          data.map((f) => ({ ...f, consumedTime: new Date(f.consumedTime) }))
        )
      );
  }

  deleteFood(food: Food) {
    return this.http.delete<Food>(`${this.API_BASE}/${food.id}`);
  }

  editFood(food: Food) {
    return this.http.put<Food>(`${this.API_BASE}`, food);
  }
}
