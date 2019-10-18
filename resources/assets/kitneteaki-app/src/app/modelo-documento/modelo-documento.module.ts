import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewModeloDocumentoComponent } from './new-modelo-documento/new-modelo-documento.component';
import {AppModule} from "../app.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [NewModeloDocumentoComponent],
  imports: [
    CommonModule,
    AppModule,
    FormsModule
  ]
})
export class ModeloDocumentoModule { }
