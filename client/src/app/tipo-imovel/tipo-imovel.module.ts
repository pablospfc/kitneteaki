import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTipoImovelComponent } from './list-tipo-imovel/list-tipo-imovel.component';
import {RouterModule} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxLoadingModule} from 'ngx-loading';
import { NewTipoImovelModalComponent } from './new-tipo-imovel-modal/new-tipo-imovel-modal.component';
import {FormsModule} from "@angular/forms";
import {AuthModule} from "../auth/auth.module";



@NgModule({
  declarations: [ListTipoImovelComponent, NewTipoImovelModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    NgxLoadingModule,
    FormsModule,
    AuthModule
  ]
})
export class TipoImovelModule { }
