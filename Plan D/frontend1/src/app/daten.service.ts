import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatenService {

  private apiUrl = 'http://localhost:8000/api/empire/'; // URL zu deinem FastAPI-Endpunkt

  http = inject(HttpClient)
  

  get_fleets(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + `fleets/`);
  }

  get_fleet(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + `fleets/` + id + `/`);
  }

  add_fleet(fleetName: string, admiral: string): Observable<any> {
    const body = `name=${encodeURIComponent(fleetName)}&admiral=${encodeURIComponent(admiral)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<any>(this.apiUrl + `fleets/`, body, { headers });
  }

  add_ship(shipName: string, fleet: string): Observable<any> {
    const body = `name=${encodeURIComponent(shipName)}&fleet=${encodeURIComponent(fleet)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<any>(this.apiUrl + `ships/`, body, { headers });
  }

  get_ships(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + `ships/`);
  }

  get_ship(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + `ships/` + id + `/`);
  }

  get_personen(path: string): Observable<any> {
    return this.http.get<any>(path);
  }

  get_person(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + `people/` + id + `/`);
  }

  add_person(name: string, rank: string, stationed_currently: string): Observable<any> {
    const body = `name=${encodeURIComponent(name)}&rank=${encodeURIComponent(rank)}&stationed_currently=${encodeURIComponent(stationed_currently)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<any>(this.apiUrl + `people/`, body, { headers });
  }

  get_admirals(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + `admirals/`);
  }
}
