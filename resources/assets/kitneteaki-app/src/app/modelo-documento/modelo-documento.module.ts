import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewModeloDocumentoComponent } from './new-modelo-documento/new-modelo-documento.component';
import {AppModule} from "../app.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { ListModeloDocumentoComponent } from './list-modelo-documento/list-modelo-documento.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";



@NgModule({
  declarations: [NewModeloDocumentoComponent, ListModeloDocumentoComponent],
  imports: [
    CommonModule,
    AppModule,
    FormsModule,
    RouterModule,
    CKEditorModule
  ]
})
export class ModeloDocumentoModule { }
