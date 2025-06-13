import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Ottieni il token
    const token = this.authService.getToken();

    // Clona la richiesta e aggiungi l'header Authorization se il token esiste
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Gestisci la richiesta e gli errori
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token scaduto o non valido
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}

// Interceptor per gestire errori globali
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Si è verificato un errore';

        if (error.error instanceof ErrorEvent) {
          // Errore lato client
          errorMessage = `Errore: ${error.error.message}`;
        } else {
          // Errore lato server
          switch (error.status) {
            case 400:
              errorMessage = 'Richiesta non valida';
              break;
            case 401:
              errorMessage = 'Non autorizzato';
              break;
            case 403:
              errorMessage = 'Accesso negato';
              break;
            case 404:
              errorMessage = 'Risorsa non trovata';
              break;
            case 500:
              errorMessage = 'Errore interno del server';
              break;
            default:
              errorMessage = `Errore: ${error.status} ${error.message}`;
          }
        }

        console.error('HTTP Error:', errorMessage, error);
        return throwError(() => ({ ...error, userMessage: errorMessage }));
      })
    );
  }
}
