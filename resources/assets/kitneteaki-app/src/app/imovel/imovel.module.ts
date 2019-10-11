import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListImovelComponent } from './list-imovel/list-imovel.component';
import { NewImovelComponent } from './new-imovel/new-imovel.component';



@NgModule({
  declarations: [ListImovelComponent, NewImovelComponent],
  imports: [
    CommonModule
  ]
})
export class ImovelModule { }
