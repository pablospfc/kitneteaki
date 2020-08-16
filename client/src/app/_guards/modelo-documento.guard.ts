import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ModeloDocumento} from '../_models/modelo-documento.model';
import {ModeloDocumentoService} from '../_services/modelo-documento.service';

@Injectable({
  providedIn: 'root'
})
export class ModeloDocumentoGuard implements Resolve<ModeloDocumento> {
  constructor(private service: ModeloDocumentoService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ModeloDocumento> {
    if (route.params && route.params.id) {
      return this.service.getById(route.params.id);
    }

    return of({
      id: null,
      id_tipo_modelo_documento: null,
      nome: null,
      conteudo: null,
      token: null
    });
  }

}
