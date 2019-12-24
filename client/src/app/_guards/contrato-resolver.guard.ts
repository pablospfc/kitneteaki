import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve} from '@angular/router';
import { Observable } from 'rxjs';
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


  }


}
