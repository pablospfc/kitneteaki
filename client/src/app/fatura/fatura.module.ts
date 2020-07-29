import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFaturaComponent } from './list-fatura/list-fatura.component';
import {AuthModule} from '../auth/auth.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxLoadingModule} from 'ngx-loading';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { FaturaModalComponent } from './fatura-modal/fatura-modal.component';
import { BoletoComponent } from './boleto/boleto.component';
import { PagamentoFaturaModalComponent } from './pagamento-fatura-modal/pagamento-fatura-modal.component';
import {TextMaskModule} from "angular2-text-mask";
import {CurrencyMaskModule} from "ng2-currency-mask";



@NgModule({
  declarations: [ListFaturaComponent, FaturaModalComponent, BoletoComponent, PagamentoFaturaModalComponent],
  imports: [
    CommonModule,
    AuthModule,
    NgxPaginationModule,
    NgxLoadingModule,
    RouterModule,
    FormsModule,
    TextMaskModule,
    CurrencyMaskModule
  ]
})
export class FaturaModule { }
