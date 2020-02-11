import { Component, OnInit } from '@angular/core';
import {ModeloDocumentoModel} from '../../_models/modelo-documento.model';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import * as $ from 'jquery';
import { insertAtCursor } from '../../../assets/scripts/textarea';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-new-modelo-documento',
  templateUrl: './new-modelo-documento.component.html',
  styleUrls: ['./new-modelo-documento.component.scss']
})
export class NewModeloDocumentoComponent implements OnInit {

  modelo: ModeloDocumentoModel;
  public Editor = DecoupledEditor;
  public textArea = DecoupledEditor.create();
  constructor() { }

  ngOnInit() {
    this.modelo = new ModeloDocumentoModel();
  }

  onSubmit(form: NgForm) {

  }

  public onReady(editor) {
    editor.ui.view.editable.element.parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.view.editable.element
    );
  }

  addText() {
    //insertAtCursor(document.getElementById('text'), 'Hello');
    this.textArea.model.change( writer => {
      writer.insertText( 'foo', this.Editor.model.document.selection.getFirstPosition() );
    } );
  }



}
