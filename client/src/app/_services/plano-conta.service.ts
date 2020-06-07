import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlanoContaService {

  private readonly API = `${environment.API}/planoconta`;
  constructor(private http: HttpClient) { }

  public getByTipoConta(idTipoConta) {
    return this.http.get<any>(`${this.API}/getByTipoConta/${idTipoConta}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

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

  private create(planoConta) {
    return this.http.post<any>(`${this.API}/cadastrar`, planoConta)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  private update(planoConta) {
    return this.http.put<any>(`${this.API}/atualizar/${planoConta.id}`, planoConta)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public save(planoConta) {
    if (planoConta.id) {
      return this.update(planoConta);
    }
    return this.create(planoConta);
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
