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
import {FinalizacaoContratoComponent} from './contrato/finalizacao-contrato/finalizacao-contrato.component';
import {OcupantesImovelModalComponent} from './contrato/ocupantes-imovel-modal/ocupantes-imovel-modal.component';
import {FiadoresContratoModalComponent} from './contrato/fiadores-contrato-modal/fiadores-contrato-modal.component';
import {ItensContratoModalComponent} from './contrato/itens-contrato-modal/itens-contrato-modal.component';
import {TestemunhasContratoModalComponent} from './contrato/testemunhas-contrato-modal/testemunhas-contrato-modal.component';
import {ParcelasContratoModalComponent} from './contrato/parcelas-contrato-modal/parcelas-contrato-modal.component';
import {GeracaoParcelasModalComponent} from './contrato/geracao-parcelas-modal/geracao-parcelas-modal.component';
import {ListFaturaComponent} from './fatura/list-fatura/list-fatura.component';
import {FaturaModalComponent} from './fatura/fatura-modal/fatura-modal.component';
import {BoletoTemplateComponent} from './templates/boleto-template/boleto-template.component';
import {BoletoComponent} from './fatura/boleto/boleto.component';
import {RenovacaoContratoComponent} from './contrato/renovacao-contrato/renovacao-contrato.component';
import {NewContaComponent} from './conta/new-conta/new-conta.component';
import {ContaResolverGuard} from './_guards/conta-resolver.guard';
import {ModeloDocumentoGuard} from './_guards/modelo-documento.guard';
import {DocumentoContratoModalComponent} from './contrato/documento-contrato-modal/documento-contrato-modal.component';
import {ListPlanoContaComponent} from './plano-conta/list-plano-conta/list-plano-conta.component';
import {ListItemComponent} from './item/list-item/list-item.component';
import {ListFormaPagamentoComponent} from './forma-pagamento/list-forma-pagamento/list-forma-pagamento.component';
import {ListTipoImovelComponent} from './tipo-imovel/list-tipo-imovel/list-tipo-imovel.component';
import {NewTipoImovelModalComponent} from "./tipo-imovel/new-tipo-imovel-modal/new-tipo-imovel-modal.component";
import {NewItemModalComponent} from "./item/new-item-modal/new-item-modal.component";
import {ListOcorrenciaComponent} from "./ocorrencia/list-ocorrencia/list-ocorrencia.component";
import {NewFormaPagamentoModalComponent} from "./forma-pagamento/new-forma-pagamento-modal/new-forma-pagamento-modal.component";
import {NewPlanoContaModalComponent} from "./plano-conta/new-plano-conta-modal/new-plano-conta-modal.component";
import {PagamentoFaturaModalComponent} from "./fatura/pagamento-fatura-modal/pagamento-fatura-modal.component";
import {ListUsuarioComponent} from "./usuario/list-usuario/list-usuario.component";
import {UpdateUsuarioModalComponent} from "./usuario/update-usuario-modal/update-usuario-modal.component";


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
        resolve: {
          contrato: ContratoResolverGuard
        }
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
        path: 'finalizacao-contrato/:id',
        component: FinalizacaoContratoComponent,
        resolve: {
          contrato: ContratoResolverGuard
        }
      },
      {
        path: 'ocupantes-imovel-modal',
        component: OcupantesImovelModalComponent
      },
      {
        path: 'documento-contrato-modal',
        component: DocumentoContratoModalComponent
      },
      {
        path: 'fiadores-contrato-modal',
        component: FiadoresContratoModalComponent
      },
      {
        path: 'itens-contrato-modal',
        component: ItensContratoModalComponent
      },
      {
        path: 'testemunhas-contrato-modal',
        component: TestemunhasContratoModalComponent
      },
      {
        path: 'parcelas-contrato-modal',
        component: ParcelasContratoModalComponent
      },
      {
        path: 'geracao-parcelas-modal',
        component: GeracaoParcelasModalComponent
      },
      {
        path: 'fatura-modal',
        component: FaturaModalComponent
      },
      {
        path: 'new-tipo-imovel',
        component: NewTipoImovelModalComponent
      },
      {
        path: 'new-item',
        component: NewItemModalComponent
      },
      {
        path: 'list-imovel',
        component: ListImovelComponent
      },
      {
        path: 'list-plano-conta',
        component: ListPlanoContaComponent
      },
      {
        path: 'new-plano-conta',
        component: NewPlanoContaModalComponent
      },
      {
        path: 'list-forma-pagamento',
        component: ListFormaPagamentoComponent
      },
      {
        path: 'new-forma-pagamento',
        component: NewFormaPagamentoModalComponent
      },
      {
        path: 'new-pagamento-fatura',
        component: PagamentoFaturaModalComponent
      },
      {
        path: 'update-usuario-modal',
        component: UpdateUsuarioModalComponent
      },
      {
        path: 'list-ocorrencia',
        component: ListOcorrenciaComponent
      },
      {
        path: 'list-usuario',
        component: ListUsuarioComponent
      },
      {
        path: 'list-item-fatura',
        component: ListItemComponent
      },
      {
        path: 'list-tipo-imovel',
        component: ListTipoImovelComponent
      },
      {
        path: 'list-fatura',
        component: ListFaturaComponent
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
        component: NewModeloDocumentoComponent,
        resolve: {
          modelo: ModeloDocumentoGuard
        }
      },
      {
        path: 'update-modelo-documento/:id',
        component: NewModeloDocumentoComponent,
        resolve: {
          modelo: ModeloDocumentoGuard
        }
      },
      {
        path: 'renovacao-contrato/:id',
        component: RenovacaoContratoComponent,
        resolve: {
          contrato: ContratoResolverGuard
        }
      },
      {
        path: 'list-conta',
        component: ListContaComponent
      },
      {
        path: 'new-conta',
        component: NewContaComponent,
        resolve: {
          conta: ContaResolverGuard
        }
      },
      {
        path: 'update-conta/:id',
        component: NewContaComponent,
        resolve: {
          conta: ContaResolverGuard
        }
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
      },
    ]
  },
  {
    path: '',
    component: BoletoTemplateComponent,
    children: [
      {
        path: 'boleto/:id',
        component: BoletoComponent
      },
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
