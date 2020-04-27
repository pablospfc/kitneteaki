import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoriaContaService {

  private readonly API = `${environment.API}/categoriaconta`;
  constructor(private http: HttpClient) { }

  public getByTipoConta(idTipoConta) {
    return this.http.get<any>(`${this.API}/getByTipoConta/${idTipoConta}`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }
}
