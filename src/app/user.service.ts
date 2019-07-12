import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
import { USERS } from './mock-users';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class UserService {

  private userUrl = 'api/users';

  constructor(
      private http: HttpClient,
      private messageService: MessageService) { }

  /** sacar lista de usuarios */
/*  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
        .pipe(
            tap(_ => this.log('Usuarios - lista')),
            catchError(this.handleError<User[]>('getUsers', []))
        );
  }*/

  getUsers(): Observable<User[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('Lista - Usuarios');
    return of(USERS);
  }

  /** buscar usuario por id */
/*  getUser(id: number): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url).pipe(
        tap(_ => this.log(`perfil de usuario id=${id}`)),
        catchError(this.handleError<User>(`getUser ID=${id}`))
    );
  }*/

  getUser(id: number): Observable<User> {
    this.messageService.add(`Perfil de usuario con id=${id}`);
    return of(USERS.find(user => user.id === id));
  }

  //////// Save methods //////////
  /** agregar usuario */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, httpOptions).pipe(
        tap((newUser: User) => this.log(`usuario agregado con id=${newUser.id}`)),
        catchError(this.handleError<User>('addUser'))
    );
  }

  /** borrar usuario */
  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.userUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
        tap(_ => this.log(`Usuario elimiado con id=${id}`)),
        catchError(this.handleError<User>('deleteUser'))
    );
  }

  /** actualizar usuario */
  updateUser(user: User): Observable<any> {
    return this.http.put(this.userUrl, user, httpOptions).pipe();
  }

  /**
   * Manejo de errores
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log de cambios */
  log(message: string) {
    this.messageService.add(`Log: ${message}`);
  }
}
