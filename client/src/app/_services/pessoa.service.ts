import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Pessoa} from '../_models/pessoa.model';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import {map, filter, catchError, mergeMap, retry, tap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly API = `${environment.API}/pessoa`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) {
  }

  public list() {
    return this.http.get<Pessoa[]>(this.API + '/listar')
      .pipe(
        map(
          res => {
            return res;
          })
      );
  }

  public getInquilinos() {
    return this.http.get<Pessoa[]>(`${this.API}/getPessoas/2`)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  public getById(id: number): Observable<any> {
    return this.http.get(this.API + '/buscar/' + id)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  private create(pessoa) {
    return this.http.post(this.API + '/cadastrar', pessoa, this.httpOptions)
      .pipe(
        catchError(error => {
          return throwError(error.error);
        })
      );
  }

  private update(pessoa) {
    return this.http.put(`${this.API}/atualizar/${pessoa.id}`, pessoa)
      .pipe(
        catchError(error => {
          return throwError(error.error);
        })
      );
  }

  public save(pessoa) {
    if (pessoa.id) {
      return this.update(pessoa);
    }
    return this.create(pessoa);
  }

}
