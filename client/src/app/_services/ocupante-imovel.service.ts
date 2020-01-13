import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {OcupanteImovel} from "../_models/ocupante_imovel.model";

@Injectable({
  providedIn: 'root'
})
export class OcupanteImovelService {

  private readonly API = `${environment.API}/ocupante`;

  constructor(private http: HttpClient) {
  }

  public listar(idContrato: number) {
    return this.http.get(`${this.API}/listByContrato/${idContrato}`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  public getByContrato(idContrato) {
    return this.http.get<any>(`${this.API}/getByContrato/${idContrato}`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  public getById(id) {
    return this.http.get<any>(`${this.API}/getById/${id}`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  public create(ocupante) {
    return this.http.post<any>(`${this.API}/cadastrar`, ocupante)
      .pipe(
        catchError(error => {
          return throwError(error.error);
        })
      );
  }

  public update(ocupante) {
    return this.http.put<any>(`${this.API}/atualizar/${ocupante.id}`, ocupante)
      .pipe(
        catchError(error => {
          return throwError(error.error);
        })
      );
  }

  public save(ocupante) {
    if (ocupante.id) {
      return this.update(ocupante);
    } else {
      return this.create(ocupante);
    }
  }
}
