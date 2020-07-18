import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPlanoContaComponent } from './list-plano-conta/list-plano-conta.component';
import {AuthModule} from "../auth/auth.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgxLoadingModule} from "ngx-loading";
import {NgxPaginationModule} from "ngx-pagination";
import {NewPlanoContaModalComponent} from "./new-plano-conta-modal/new-plano-conta-modal.component";



@NgModule({
  declarations: [ListPlanoContaComponent, NewPlanoContaModalComponent],
  imports: [
    CommonModule,
    CommonModule,
    AuthModule,
    FormsModule,
    RouterModule,
    NgxLoadingModule,
    NgxPaginationModule
  ]
})
export class PlanoContaModule { }
