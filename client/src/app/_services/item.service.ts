import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly API = `${environment.API}/item`;
  constructor(private http: HttpClient) { }

  public list() {
    return this.http.get<any>(`${this.API}/listar`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }
}
