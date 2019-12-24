import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ListPessoaComponent } from './pessoa/list-pessoa/list-pessoa.component';
import { ListContratoComponent } from './contrato/list-contrato/list-contrato.component';
import { ListImovelComponent } from './imovel/list-imovel/list-imovel.component';
import { DashboardTemplateComponent } from './templates/dashboard-template/dashboard-template.component';
import { ListContaComponent } from './conta/list-conta/list-conta.component';
import { LoginTemplateComponent } from './templates/login-template/login-template.component';
import { LoginComponent } from './auth/login/login.component';
import {NewPessoaComponent} from './pessoa/new-pessoa/new-pessoa.component';
import {PessoaResolverGuard} from './_guards/pessoa-resolver.guard';
import {NewImovelComponent} from './imovel/new-imovel/new-imovel.component';
import {ImovelResolverGuard} from './_guards/imovel-resolver.guard';
import {ListModeloDocumentoComponent} from './modelo-documento/list-modelo-documento/list-modelo-documento.component';
import {NewModeloDocumentoComponent} from './modelo-documento/new-modelo-documento/new-modelo-documento.component';
import {NewContratoComponent} from './contrato/new-contrato/new-contrato.component';
import {NewGarantiasContratoComponent} from './contrato/new-garantias-contrato/new-garantias-contrato.component';
import {AuthGuard} from './_guards/auth.guard';
import {PerfilComponent} from './auth/perfil/perfil.component';
import {ContratoResolverGuard} from './_guards/contrato-resolver.guard';


const routes: Routes = [
  {
  path: '',
    component: DashboardTemplateComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'list-pessoa',
        component: ListPessoaComponent
      },
      {
        path: 'new-pessoa',
        component: NewPessoaComponent,
        resolve: {
          pessoa: PessoaResolverGuard
        }
      },
      {
        path: 'update-pessoa/:id',
        component: NewPessoaComponent,
        resolve: {
          pessoa: PessoaResolverGuard
        }
      },
      {
        path: 'list-contrato',
        component: ListContratoComponent
      },
      {
        path: 'new-contrato',
        component: NewContratoComponent,
      },
      {
        path: 'update-contrato/:id',
        component: NewContratoComponent,
        resolve: {
          contrato: ContratoResolverGuard
        }
      },
      {
        path: 'new-garantias-contrato/:id',
        component: NewGarantiasContratoComponent
      },
      {
        path: 'list-imovel',
        component: ListImovelComponent
      },
      {
        path: 'new-imovel',
        component: NewImovelComponent,
        resolve: {
          imovel: ImovelResolverGuard
        }
      },
      {
        path: 'update-imovel/:id',
        component: NewImovelComponent,
        resolve: {
          imovel: ImovelResolverGuard
        }
      },
      {
        path: 'list-conta',
        component: ListContaComponent
      },
      {
        path: 'list-modelo-documento',
        component: ListModeloDocumentoComponent
      },
      {
        path: 'new-modelo-documento',
        component: NewModeloDocumentoComponent
      }
    ]
  },
  {
    path: '',
    component: LoginTemplateComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
