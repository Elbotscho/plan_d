import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlPath = 'http://localhost:8000/api/account/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
    return this.http.post<any>(this.urlPath + 'login/', body, { headers });
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout() {
    const authToken = this.getToken()
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.urlPath + 'logout/', {}, {headers});
    
  }

  register(username: string, email: string, password: string, password2: string): Observable<any> {
    const body = `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&password2=${encodeURIComponent(password2)}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post<any>(this.urlPath + 'register/', body, {headers});
  }

  get_users(): Observable<any[]> {
    return this.http.get<any>(this.urlPath + `users/`);
  }
}
