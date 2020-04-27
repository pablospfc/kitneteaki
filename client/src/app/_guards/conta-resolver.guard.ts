import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Conta} from '../_models/conta.model';
import {ContaService} from '../_services/conta.service';

@Injectable({
  providedIn: 'root'
})
export class ContaResolverGuard implements Resolve<Conta> {
  constructor(private service: ContaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Conta> {
    if (route.params && route.params.id) {
      return this.service.getById(route.params.id);
    }

    return of({
        id: null,
        id_categoria_conta: null,
        id_tipo_conta: null,
        repetir_lancamento: null,
        descricao: null,
        valor: null,
        id_recorrencia_conta: null,
        id_imovel: null,
        ocorrencia: null,
        data_vencimento: null,
        competencia: null,
        observacoes: null
      });

  }
}
