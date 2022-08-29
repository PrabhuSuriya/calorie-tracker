import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NutritionixService {
  private INSTANT_ENDPOINT = 'v2/search/instant';
  private API_BASE: string;
  private headers;

  constructor(private http: HttpClient) {
    this.API_BASE = `${environment.NUTRITIONIX_BASE}/${this.INSTANT_ENDPOINT}`;
    this.headers = {
      'x-app-id': environment.NUTRITIONIX_APPID,
      'x-app-key': environment.NUTRITIONIX_APIKEY,
    };
  }

  lookupFoods(searchKey: string) {
    const url = `${this.API_BASE}?query=${searchKey}`;
    return this.http.get(url, {
      headers: this.headers,
    });
  }
}
