import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Contrato} from '../_models/contrato.model';
import {ContratoService} from '../_services/contrato.service';

@Injectable({
  providedIn: 'root'
})
export class ContratoResolverGuard implements Resolve<Contrato> {
  constructor(private service: ContratoService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contrato> {
    if (route.params && route.params.id) {
      return this.service.getById(route.params.id);
    }
    return of({
      id: null,
    id_contrato: null,
    id_status: null,
    id_locatario: null,
    id_locador: null,
    id_imovel: null,
    id_tipo_contrato: null,
    valor: null,
    primeiro_vencimento: null,
    dia_vencimento: null,
    data_inicio: null,
    data_fim: null,
    inicio_estadia: null,
    fim_estadia: null,
    vigencia: null,
    taxa_servico: null,
    dias: null,
    total: null,
    sinal: null,
    referencia: null,
    observacoes: null,
    renovou: null,
    chave: null,
    });

  }


}
