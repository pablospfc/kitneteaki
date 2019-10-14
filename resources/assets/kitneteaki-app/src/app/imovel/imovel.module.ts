import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListImovelComponent } from './list-imovel/list-imovel.component';
import { NewImovelComponent } from './new-imovel/new-imovel.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppModule} from "../app.module";



@NgModule({
  declarations: [ListImovelComponent, NewImovelComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AppModule
  ]
})
export class ImovelModule { }
