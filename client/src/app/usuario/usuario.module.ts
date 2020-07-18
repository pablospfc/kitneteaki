import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsuarioComponent } from './list-usuario/list-usuario.component';
import {RouterModule} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination";
import {NgxLoadingModule} from "ngx-loading";
import { UpdateUsuarioModalComponent } from './update-usuario-modal/update-usuario-modal.component';
import {FormsModule} from "@angular/forms";
import {AuthModule} from "../auth/auth.module";



@NgModule({
  declarations: [ListUsuarioComponent, UpdateUsuarioModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    NgxLoadingModule,
    FormsModule,
    AuthModule
  ]
})
export class UsuarioModule { }
