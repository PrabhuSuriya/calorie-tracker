import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DayCount, UserAggregate } from '../models/report.models';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private API_BASE: string;

  constructor(private http: HttpClient) {
    this.API_BASE = `${environment.API_BASE}/report`;
  }

  getEntriesByDay() {
    return this.http.get<DayCount[]>(`${this.API_BASE}/daycount`);
  }

  getUserAggregate() {
    return this.http.get<UserAggregate[]>(`${this.API_BASE}/useraggregate`);
  }
}
