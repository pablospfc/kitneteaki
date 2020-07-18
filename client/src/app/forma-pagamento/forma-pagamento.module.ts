import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFormaPagamentoComponent } from './list-forma-pagamento/list-forma-pagamento.component';
import {AuthModule} from "../auth/auth.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgxLoadingModule} from "ngx-loading";
import {NgxPaginationModule} from "ngx-pagination";
import {NewFormaPagamentoModalComponent} from "./new-forma-pagamento-modal/new-forma-pagamento-modal.component";



@NgModule({
  declarations: [ListFormaPagamentoComponent, NewFormaPagamentoModalComponent],
  imports: [
    CommonModule,
    AuthModule,
    FormsModule,
    RouterModule,
    NgxLoadingModule,
    NgxPaginationModule
  ]
})
export class FormaPagamentoModule { }
