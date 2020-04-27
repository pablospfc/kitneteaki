import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private readonly API = `${environment.API}/conta`;
  constructor(private http: HttpClient) { }

  public list(dados): Observable<any> {
    let params = new HttpParams();
    if (dados.id_tipo_conta) {
      params = params.set('id_tipo_conta', dados.id_tipo_conta);
    }
    if (dados.id_categoria_conta) {
      params = params.set('id_categoria_conta', dados.id_categoria_conta);
    }
    if (dados.id_status) {
      params = params.set('id_status', dados.id_status);
    }
    if (dados.id_imovel) {
      params = params.set('id_imovel', dados.id_imovel);
    }
    if (dados.periodo_inicial && dados.periodo_final) {
      params = params.set('periodo_inicial', dados.periodo_inicial);
      params = params.set('periodo_final', dados.periodo_final);
    }
    if (dados.valor_inicial && dados.valor_final) {
      params = params.set('valor_inicial', dados.valor_inicial);
      params = params.set('valor_final', dados.valor_final);
    }
    return this.http.get<any>(`${this.API}/listar`, {params})
      .pipe(
        map(data => {
          return data;
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

  public remove(id) {
    return this.http.delete<any>(`${this.API}/excluir/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public save(conta) {
    if (conta.id) {
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
