import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Pessoa} from "../_models/pessoa.model";
import {PessoaService} from "../_services/pessoa.service";

@Injectable({
  providedIn: 'root'
})
export class PessoaResolverGuard implements Resolve<Pessoa> {
  constructor(private service: PessoaService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pessoa> {
    if (route.params && route.params['id']) {
      return this.service.getById(route.params['id']);
    }

    return of({
      id: null,
      id_estado_civil: null,
    id_tipo_pessoa: null,
    id_genero: null,
    id_categoria_pessoa: null,
    id_nacionalidade: null,
    nome: null,
    cpf_cnpj: null,
    rg: null,
    passaporte: null,
    data_nascimento: null,
    orgao_expedidor: null,
    data_emissao: null,
    email: null,
    telefone_celular: null,
    whatsapp: null,
    profissao: null
    } );
  }

}
