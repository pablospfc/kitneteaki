import {Component, Input, OnInit} from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import {Contrato} from "../../_models/contrato.model";
import {ModeloDocumentoService} from "../../_services/modelo-documento.service";

@Component({
  selector: 'app-documento-contrato-modal',
  templateUrl: './documento-contrato-modal.component.html',
  styleUrls: ['./documento-contrato-modal.component.scss']
})
export class DocumentoContratoModalComponent implements OnInit {

  @Input() idContrato: number;
  @Input() idModeloDocumento: number;
  public Editor = DecoupledEditor;
  contrato: Contrato;
  constructor(private modeloDocumentoService: ModeloDocumentoService) { }

  ngOnInit() {
    this.contrato = new Contrato();
    this.getModeloDocumento();
  }

  public onReady(editor) {
    editor.ui.view.editable.element.parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.view.editable.element
    );
  }

  getModeloDocumento() {
    this.modeloDocumentoService.getById(this.idModeloDocumento)
      .subscribe(data => {
        this.contrato.contrato = data.conteudo;
      }, error => {

      });
  }

}
