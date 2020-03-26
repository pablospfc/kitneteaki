import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ParcelaItem} from "../_models/parcela-item.model";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParcelaItemService {

  private readonly API = `${environment.API}/parcelaitem`;
  constructor(private http: HttpClient) { }

  public getByParcela(idParcela) {
    return this.http.get<any>(`${this.API}/getByParcela/${idParcela}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public excluir(id) {
    return this.http.delete<any>(`${this.API}/excluir/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

}
