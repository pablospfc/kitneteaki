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
import {NewPessoaComponent} from "./pessoa/new-pessoa/new-pessoa.component";


const routes: Routes = [
  {
  path: '',
    component: DashboardTemplateComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'list-pessoa',
        component: ListPessoaComponent
      },
      {
        path: 'new-pessoa',
        component: NewPessoaComponent
      },
      {
        path: 'list-contrato',
        component: ListContratoComponent
      },
      {
        path: 'list-imovel',
        component: ListImovelComponent
      },
      {
        path: 'list-conta',
        component: ListContaComponent
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
