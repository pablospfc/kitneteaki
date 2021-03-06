import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly API = `${environment.API}/item`;
  constructor(private http: HttpClient) { }

  public list() {
    return this.http.get<any>(`${this.API}/listar`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  public getById(id: number) {
    return this.http.get<any>(`${this.API}/getById/${id}`)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  private create(item) {
    return this.http.post<any>(`${this.API}/cadastrar`, item)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  private update(item) {
    return this.http.put<any>(`${this.API}/atualizar/${item.id}`, item)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public save(item) {
    if (item.id) {
      return this.update(item);
    }
    return this.create(item);
  }

  public remove(id) {
    return this.http.delete<any>(`${this.API}/excluir/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
