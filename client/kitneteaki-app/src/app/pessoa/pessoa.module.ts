import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPessoaComponent } from './list-pessoa/list-pessoa.component';
import { NewPessoaComponent } from './new-pessoa/new-pessoa.component';
import {FormsModule} from "@angular/forms";
import {AppModule} from "../app.module";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [ListPessoaComponent, NewPessoaComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppModule,
    SharedModule,
    RouterModule
  ]
})
export class PessoaModule { }