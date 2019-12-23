import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPessoaComponent } from './list-pessoa/list-pessoa.component';
import { NewPessoaComponent } from './new-pessoa/new-pessoa.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AuthModule} from "../auth/auth.module";
import {NgxLoadingModule} from "ngx-loading";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [ListPessoaComponent, NewPessoaComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AuthModule,
    NgxLoadingModule,
    NgxPaginationModule
  ]
})
export class PessoaModule { }
