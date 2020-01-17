import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  public list() {
    return this.http.get<Contrato[]>(`${this.API}/listar`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  public concluirContrato(id) {
    const data = {
      id_status: 1
    };
    return this.http.put<any>(`${this.API}/concluir/${id}`, data)
      .pipe(
        catchError(error => {
          return throwError(error.error);
        })
      );
  }

  public getById(id: number): Observable <any> {
    return this.http.get(`${this.API}/buscar/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error.error);
        })
      );
  }

  private create(contrato) {
    return this.http.post<any>(`${this.API}/cadastrar`, contrato, this.httpOptions)
      .pipe(
        catchError(error => {
          return throwError(error.error);
        })
      );
  }

  private update(contrato) {
    return this.http.put<any>(`${this.API}/atualizar/${contrato.id}`, contrato)
      .pipe(
        catchError(error => {
          return throwError(error.error);
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
