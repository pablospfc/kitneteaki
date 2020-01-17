import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelaService {

  private readonly API = `${environment.API}/parcela`;
  constructor(private http: HttpClient) { }

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
          return throwError(error);
        })
      );
  }

  public getParcelas(idContrato) {
    return this.http.get<any>(`${this.API}/getParcelas/${idContrato}`)
      .pipe(
        map(response => {
          return response;
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
