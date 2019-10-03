import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Pessoa} from "./pessoa.model";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError, BehaviorSubject} from "rxjs";
import {map, filter, catchError, mergeMap, retry, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private readonly API = `${environment.API}pessoa`;

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

  public getById(id: number) {

  }

  private create(pessoa) {
    return this.http.post(this.API + '/cadastrar', pessoa)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  private update(pessoa) {
    return this.http.put(`${this.API}/atualizar/${pessoa.id}`, pessoa)
      .pipe(
        map(response => {
          return response;
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
