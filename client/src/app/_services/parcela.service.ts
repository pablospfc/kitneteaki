import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelaService {

  private readonly API = `${environment.API}/parcela`;
  constructor(private http: HttpClient) { }

  public listParcelas(dados): Observable<any> {
    return this.http.get<any>(`${this.API}/listParcelas`, dados)
     .pipe(
       map(response => {
         return response;
       })
     );
  }

  public getByContrato(id: number) {
    return this.http.get<any>(`${this.API}/getByContrato/${id}`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  public gerarBoleto() {
    return this.http.get<any>(`${this.API}/gerarBoleto`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  public getById(id) {
    return this.http.get<any>(`${this.API}/getById/${id}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  public delete(id: number) {
    return this.http.delete<any>(`${this.API}/excluir/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public getParcelas(idContrato) {
    return this.http.get<any>(`${this.API}/getParcelas/${idContrato}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public gerarParcelas(idContrato) {
    return this.http.get<any>(`${this.API}/gerarParcelas/${idContrato}`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }
}
