import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  private readonly API = `${environment.API}/formapagamento`;
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<any>(`${this.API}/listar`)
      .pipe(
        map(data => {
          return data;
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

  private create(formaPagamento) {
    return this.http.post<any>(`${this.API}/cadastrar`, formaPagamento)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  private update(formaPagamento) {
    return this.http.put<any>(`${this.API}/atualizar/${formaPagamento.id}`, formaPagamento)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public save(formaPagamento) {
    if (formaPagamento.id) {
      return this.update(formaPagamento);
    }
    return this.create(formaPagamento);
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
