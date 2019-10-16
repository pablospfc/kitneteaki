import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private readonly API = 'https://viacep.com.br/ws/';
  constructor(private http: HttpClient) { }

  public buscaCEP(cep: string) {
    return this.http.get(`${this.API}/${cep}/json`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }
}
