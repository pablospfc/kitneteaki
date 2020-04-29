import {Component, OnInit, ViewChild} from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import * as $ from 'jquery';
import {NgForm} from '@angular/forms';
import {ModeloDocumentoService} from '../../_services/modelo-documento.service';
import {AlertMessageService} from '../../_services/alert-message.service';
import {ModeloDocumento} from '../../_models/modelo-documento.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-new-modelo-documento',
  templateUrl: './new-modelo-documento.component.html',
  styleUrls: ['./new-modelo-documento.component.scss']
})
export class NewModeloDocumentoComponent implements OnInit {

  modelo: ModeloDocumento;
  public Editor = DecoupledEditor;
  @ViewChild('editor', { static: false }) editor: CKEditorComponent;

  constructor(private modeloDocumentoService: ModeloDocumentoService,
              private router: Router,
              private actRoute: ActivatedRoute,
              private alertMessageService: AlertMessageService) { }

  ngOnInit() {
    this.modelo = new ModeloDocumento();
    this.modelo.conteudo = 'Escreva aqui seu modelo de documento';

    this.actRoute.data.subscribe(data => {
      this.modelo = data.modelo;
    });

  }

  onSubmit(form: NgForm) {
    this.modeloDocumentoService.save(form.value)
      .subscribe(data => {
        this.alertMessageService.success(data.message);
      }, error => {
        this.alertMessageService.error(error.message);
      });
  }

  public onReady(editor) {
    editor.ui.view.editable.element.parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.view.editable.element
    );
  }

  addText(arg) {
    const appendData = arg;
    const selection = this.editor.editorInstance.model.document.selection;
    const range = selection.getFirstRange();
    this.editor.editorInstance.model.change(writer => {
      writer.insert(appendData, range.start);
    });

  }


}
