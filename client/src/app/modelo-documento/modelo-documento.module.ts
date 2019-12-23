import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewModeloDocumentoComponent } from './new-modelo-documento/new-modelo-documento.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { ListModeloDocumentoComponent } from './list-modelo-documento/list-modelo-documento.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {AuthModule} from "../auth/auth.module";



@NgModule({
  declarations: [NewModeloDocumentoComponent, ListModeloDocumentoComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CKEditorModule,
    AuthModule
  ]
})
export class ModeloDocumentoModule { }
