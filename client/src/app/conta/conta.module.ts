import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContaComponent } from './list-conta/list-conta.component';
import { NewContaComponent } from './new-conta/new-conta.component';
import {RouterModule} from "@angular/router";
import {AuthModule} from "../auth/auth.module";
import {NgxLoadingModule} from "ngx-loading";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import {CurrencyMaskModule} from "ng2-currency-mask";



@NgModule({
  declarations: [ListContaComponent, NewContaComponent],
    imports: [
        CommonModule,
        RouterModule,
        AuthModule,
        NgxLoadingModule,
        NgxPaginationModule,
        FormsModule,
        CurrencyMaskModule
    ]
})
export class ContaModule { }
