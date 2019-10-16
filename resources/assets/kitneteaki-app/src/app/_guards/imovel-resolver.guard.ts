import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Imovel} from '../_models/imovel.model';
import {ImovelService} from '../_services/imovel.service';

@Injectable({
  providedIn: 'root'
})
export class ImovelResolverGuard implements Resolve<Imovel> {
  constructor(private service: ImovelService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Imovel> {
    if (route.params && route.params.id) {
      return this.service.getById(route.params.id);
    }

    return of({
      id: null,
      id_tipo_imovel: null,
      id_status: null,
      id_transacao_imovel: null,
      nome: null,
      logradouro: null,
      condominio: null,
      apartamento: null,
      latitude: null,
      longitude: null,
      ponto_referencia: null,
      bloco: null,
      valor_iptu: null,
      valor_condominio: null,
      valor_imovel: null,
      numero: null,
      cep: null,
      complemento: null,
      bairro: null,
      cidade: null,
      estado: null,
  });
  }
}
