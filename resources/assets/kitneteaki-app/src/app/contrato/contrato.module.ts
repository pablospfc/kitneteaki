import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContratoComponent } from './list-contrato/list-contrato.component';
import { NewContratoComponent } from './new-contrato/new-contrato.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AppModule} from "../app.module";



@NgModule({
  declarations: [ListContratoComponent, NewContratoComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AppModule
  ]
})
export class ContratoModule { }
