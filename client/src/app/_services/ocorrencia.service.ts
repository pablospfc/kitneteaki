import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  private readonly api = `${environment.API}/ocorrencia`;
  constructor(private http: HttpClient) { }

  public list() {
    return this.http.get<any>(`${this.api}/listar`)
    .pipe(
      map(data => {
        return data;
      })
      
    );
  }
}
