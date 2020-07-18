import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Imovel} from "../_models/imovel.model";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly api = `${environment.API}/usuario`;
  constructor(private http: HttpClient) { }

  public list() {
    return this.http.get<any>(`${this.api}/listar`)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public getById(id) {
    return this.http.get<any>(`${this.api}/getById/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public atualizar(usuario) {
    console.log(usuario);
    return this.http.put<any>(`${this.api}/atualizar/${usuario.id}`, usuario)
      .pipe(
        map(response => {
          return response;
        })
      );
  }
}
