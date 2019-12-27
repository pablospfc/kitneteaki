import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestemunhaContratoService {

  private readonly API = `${environment.API}/testemunha`;

  constructor(private http: HttpClient) {
  }

  public getByContrato(id: number) {
    return this.http.get<any>(`${this.API}/getByContrato/${id}`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  private create(testemunha) {
    return this.http.post<any>(`${this.API}/cadastrar`, testemunha)
      .pipe(
        catchError(error => {
          return throwError(error.error);
        })
      );
  }

  private update(testemunha) {
    return this.http.put<any>(`${this.API}/atualizar/${testemunha.id}`, testemunha)
      .pipe(
        catchError(error => {
          return throwError(error.error);
        })
      );
  }

  public save(testemunha) {
    if (testemunha.id) {
      return this.update(testemunha);
    } else {
      return this.create(testemunha);
    }
  }
}
