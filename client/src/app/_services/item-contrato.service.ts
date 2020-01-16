import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemContratoService {

  private readonly API = `${environment.API}/itemcontrato`;

  constructor(private http: HttpClient) {
  }

  public getByContrato(id: number) {
    return this.http.get<any>(`${this.API}/getByContrato/${id}`)
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

  public getById(id: number) {
    return this.http.get<any>(`${this.API}/getById/${id}`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  private create(itemContrato) {
    return this.http.post<any>(`${this.API}/cadastrar`, itemContrato)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  private update(itemContrato) {
    return this.http.put<any>(`${this.API}/atualizar/${itemContrato.id}`, itemContrato)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public save(itemContrato) {
    if (itemContrato.id) {
      return this.update(itemContrato)
    }

    return this.create(itemContrato);
  }
}
