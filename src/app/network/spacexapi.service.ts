
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission';

@Injectable({ providedIn: 'root' })
export class SpacexapiService {
  private baseURL = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  getAllMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.baseURL);
  }

  getMissionByFlightNumber(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.baseURL}/${id}`);
  }

  getFilteredMissions(filters: any): Observable<Mission[]> {
    let query = '';
    if (filters.launch_year) query += `launch_year=${filters.launch_year}&`;
    if (filters.launch_success !== null && filters.launch_success !== undefined)
      query += `launch_success=${filters.launch_success}&`;
    return this.http.get<Mission[]>(`${this.baseURL}?${query}`);
  }
}