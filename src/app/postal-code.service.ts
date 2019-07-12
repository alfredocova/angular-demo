import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {PostalData} from './postal-data';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PostalCodeService {

  private codeUrl = 'https://api-codigos-postales.herokuapp.com/v2/codigo_postal/';

  constructor(
      private http: HttpClient,
      private messageService: MessageService) { }

  getData(id: number): Observable<PostalData> {
    const url = `${this.codeUrl}${id}`;
    return this.http.get<PostalData>(url).pipe(
        tap(_ => this.log(`informacion de cp=${id}`)),
        catchError(this.handleError<PostalData>(`getData CP=${id}`))
    );
  }

  /**
   * Manejo de errores
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`No se puede procesar la petición`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log de cambios */
  private log(message: string) {
    this.messageService.add(`Log: ${message}`);
  }
}
