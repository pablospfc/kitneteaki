import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContratoComponent } from './list-contrato/list-contrato.component';
import { NewContratoComponent } from './new-contrato/new-contrato.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AppModule} from '../app.module';
import { NewGarantiasContratoComponent } from './new-garantias-contrato/new-garantias-contrato.component';
import {AuthModule} from "../auth/auth.module";
import {NgxLoadingModule} from "ngx-loading";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [ListContratoComponent, NewContratoComponent, NewGarantiasContratoComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AuthModule,
    NgxLoadingModule,
    NgxPaginationModule,
  ]
})
export class ContratoModule { }
