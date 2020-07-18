import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListOcorrenciaComponent} from './list-ocorrencia/list-ocorrencia.component';
import {AuthModule} from "../auth/auth.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgxLoadingModule} from "ngx-loading";
import {NgxPaginationModule} from "ngx-pagination";



@NgModule({
  declarations: [ListOcorrenciaComponent],
  imports: [
    CommonModule,
    AuthModule,
    FormsModule,
    RouterModule,
    NgxLoadingModule,
    NgxPaginationModule
  ]
})
export class OcorrenciaModule { }
