import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoImovelService {

  private readonly api = `${environment.API}/tipoimovel`;
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<any>(`${this.api}/listar`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  public getById(id: number) {
    return this.http.get<any>(`${this.api}/getById/${id}`)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  private create(tipoImovel) {
    return this.http.post<any>(`${this.api}/cadastrar`, tipoImovel)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  private update(tipoImovel) {
    return this.http.put<any>(`${this.api}/atualizar/${tipoImovel.id}`, tipoImovel)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public save(tipoImovel) {
    if (tipoImovel.id) {
      return this.update(tipoImovel);
    }
    return this.create(tipoImovel);
  }

  public remove(id) {
    return this.http.delete<any>(`${this.api}/excluir/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
