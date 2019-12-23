import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import {map, filter, catchError, mergeMap, retry, tap, take} from 'rxjs/operators';
import {Imovel} from '../_models/imovel.model';
@Injectable({
  providedIn: 'root'
})
export class ImovelService {

  private readonly API = `${environment.API}/imovel`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  public list() {
   return this.http.get<Imovel[]>(`${this.API}/listar`)
     .pipe(
       map(response => {
        return response;
       })
     );
  }

  public getByTransacao(idTransacao: number) {
    return this.http.get<Imovel[]>(`${this.API}/getByTransacao/${idTransacao}`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  public save(imovel) {
    if (imovel.id) {
      return this.update(imovel);
    }
    return this.create(imovel);
  }

  private create(imovel) {
    return this.http.post(`${this.API}/cadastrar`, imovel, this.httpOptions)
      .pipe(
        catchError(error => {
          return throwError(error.error);
        })
      );
  }

  private update(imovel) {
    return this.http.put(`${this.API}/atualizar/${imovel.id}`, imovel)
      .pipe(
        catchError(error => {
         return throwError(error.error);
        })
      );
  }

  public getById(id: number): Observable <any> {
    return this.http.get(`${this.API}/buscar/${id}`)
      .pipe(
        map(res => {
           return res;
        })
      );
  }
}
