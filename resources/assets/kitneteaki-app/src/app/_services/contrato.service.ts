import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Contrato} from '../_models/contrato.model';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private readonly API = `${environment.API}contrato`;
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

  public getById(id: number) {
    return this.http.get(`${this.API}/buscar/${id}`)
      .pipe(
        catchError(error => {
          return throwError(error.error);
        })
      );
  }

  private create(contrato) {
    return this.http.post(`${this.API}/cadastrar`, contrato, this.httpOptions)
      .pipe(
        catchError(error => {
          return throwError(error.error);
        })
      );
  }

  private update(contrato) {
    return this.http.put(`${this.API}/atualizar/${contrato.id}`, contrato)
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
