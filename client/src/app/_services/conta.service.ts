import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private readonly API = `${environment.API}/conta`;
  constructor(private http: HttpClient) { }

  public list() {
    return this.http.get<any>(`${this.API}/listar`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  public save(conta) {
    if (conta.id){
      return this.update(conta);
    }
    return this.create(conta);
  }

  public create(conta) {
    return this.http.post<any>(`${this.API}/cadastrar`, conta)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public update(conta) {
    return this.http.put<any>(`${this.API}/atualizar/${conta.id}`, conta)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
