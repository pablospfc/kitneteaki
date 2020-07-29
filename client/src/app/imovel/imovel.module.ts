import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListImovelComponent } from './list-imovel/list-imovel.component';
import { NewImovelComponent } from './new-imovel/new-imovel.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AuthModule} from "../auth/auth.module";
import {NgxPaginationModule} from "ngx-pagination";
import {NgxLoadingModule} from "ngx-loading";
import {CurrencyMaskModule} from "ng2-currency-mask";

@NgModule({
  declarations: [ListImovelComponent, NewImovelComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        AuthModule,
        NgxPaginationModule,
        NgxLoadingModule,
        CurrencyMaskModule
    ]
})
export class ImovelModule { }
