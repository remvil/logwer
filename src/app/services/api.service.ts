import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_BASE_URL =
    'https://document-recognition.microservices.logwer.com';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Metodo generico per GET
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.API_BASE_URL}${endpoint}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  // Metodo generico per POST
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.API_BASE_URL}${endpoint}`, data, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  // Metodo generico per PUT
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.API_BASE_URL}${endpoint}`, data, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  // Metodo generico per DELETE
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.API_BASE_URL}${endpoint}`, {
      headers: this.authService.getAuthHeaders(),
    });
  }

  // Esempi di metodi specifici per la tua dashboard

  // Esempio: ottenere documenti
  getDocRecog(): Observable<any[]> {
    return this.get<any[]>('/DocRecog');
  }

  // Esempio: ottenere dettagli utente
  getUserProfile(): Observable<any> {
    return this.get<any>('/User/Profile');
  }
}
