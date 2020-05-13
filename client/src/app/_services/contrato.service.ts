import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Contrato} from '../_models/contrato.model';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private readonly API = `${environment.API}/contrato`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }

  public list(dados): Observable<any>  {
    let params = new HttpParams();
    if (dados.id_locatario) {
      params = params.set('id_locatario', dados.id_locatario);
    }
    if (dados.id_tipo_contrato) {
      params = params.set('id_tipo_contrato', dados.id_tipo_contrato);
    }
    if (dados.id_status) {
      params = params.set('id_status', dados.id_status);
    }
    if (dados.id_imovel) {
      params = params.set('id_imovel', dados.id_imovel);
    }
    if (dados.vigencia_inicial && dados.vigencia_final) {
      params = params.set('vigencia_inicial', dados.vigencia_inicial);
      params = params.set('vigencia_final', dados.vigencia_final);
    }
    if (dados.valor_inicial && dados.valor_final) {
      params = params.set('valor_inicial', dados.valor_inicial);
      params = params.set('valor_final', dados.valor_final);
    }
    return this.http.get<Contrato[]>(`${this.API}/listar`, {params})
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public concluirContrato(data) {
    return this.http.put<any>(`${this.API}/concluir/${data.id}`, data)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public setDocumentoContrato(contrato) {
    return this.http.put<any>(`${this.API}/setDocumentoContrato/${contrato.id}`, contrato)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public getById(id: number): Observable <any> {
    return this.http.get(`${this.API}/buscar/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  private create(contrato) {
    return this.http.post<any>(`${this.API}/cadastrar`, contrato, this.httpOptions)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public renew(contrato) {
    return this.http.post<any>(`${this.API}/renovar`, contrato)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  private update(contrato) {
    return this.http.put<any>(`${this.API}/atualizar/${contrato.id}`, contrato)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public delete(id) {
    return this.http.delete<any>(`${this.API}/excluir/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public save(contrato) {
    if (contrato.id) {
      return this.update(contrato);
    }
    return this.create(contrato);
  }
}
