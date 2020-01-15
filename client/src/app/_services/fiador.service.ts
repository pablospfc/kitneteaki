import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiadorService {

  private readonly API = `${environment.API}/fiador`;
  constructor(private http: HttpClient) { }

  public getByContrato(id: number) {
    return this.http.get<any>(`${this.API}/getByContrato/${id}`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  public getById(id: number) {
    return this.http.get<any>(`${this.API}/getById/${id}`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  public delete(id: number) {
    return this.http.delete<any>(`${this.API}/excluir/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error.error);
        })
      );
  }

  public save(fiador) {
    if (fiador.id) {
      return this.update(fiador);
    } else {
      return this.create(fiador);
    }
  }

  private create(fiador) {
    return this.http.post<any>(`${this.API}/cadastrar`, fiador )
      .pipe(
        catchError(error => {
          return throwError(error.error);
        })
      );
  }

  private update(fiador) {
    return this.http.put<any>(`${this.API}/atualizar/${fiador.id}`, fiador )
      .pipe(
        catchError(error => {
          return throwError(error.error);
        })
      );
  }
}
