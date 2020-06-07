import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModeloDocumentoService {

  private readonly API = `${environment.API}/modelodocumento`;

  constructor(private http: HttpClient) {
  }

  public list() {
    return this.http.get<any>(`${this.API}/listar`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  public getById(id): Observable<any> {
    return this.http.get<any>(`${this.API}/buscar/${id}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  public getDocumentoContrato(id, idContrato) {
    return this.http.get<any>(`${this.API}/getDocumentoContrato/${id}/${idContrato}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  public save(modeloDocumento) {
    if (modeloDocumento.id) {
      return this.update(modeloDocumento);
    }
    return this.create(modeloDocumento);
  }

  private create(modeloDocumento) {
    return this.http.post<any>(`${this.API}/cadastrar`, modeloDocumento)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  private update(modeloDocumento) {
    return this.http.put<any>(`${this.API}/atualizar/${modeloDocumento.id}`, modeloDocumento)
      .pipe(
        catchError(error => {
          return throwError(error);
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
}
