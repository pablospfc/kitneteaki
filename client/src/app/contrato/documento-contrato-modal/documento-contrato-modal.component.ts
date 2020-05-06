import {Component, Input, OnInit} from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {CKEditorComponent} from '@ckeditor/ckeditor5-angular';
import {Contrato} from "../../_models/contrato.model";
import {ModeloDocumentoService} from "../../_services/modelo-documento.service";
import {ContratoService} from "../../_services/contrato.service";
import {AlertMessageService} from "../../_services/alert-message.service";
import {NgForm} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-documento-contrato-modal',
  templateUrl: './documento-contrato-modal.component.html',
  styleUrls: ['./documento-contrato-modal.component.scss']
})
export class DocumentoContratoModalComponent implements OnInit {

  @Input() idContrato: number;
  @Input() idModeloDocumento: number;
  public Editor = DecoupledEditor;
  public loading: boolean;
  contrato: Contrato;

  constructor(private modeloDocumentoService: ModeloDocumentoService,
              private alertMessageService: AlertMessageService,
              private modalRef: BsModalRef,
              private contratoService: ContratoService) {
  }

  ngOnInit() {
    this.contrato = new Contrato();
    this.getDocumentoContrato();
  }

  public onSubmit(form: NgForm) {
    this.loading = true;
    this.contrato.id = this.idContrato;
    this.contratoService.setDocumentoContrato(this.contrato)
      .subscribe(data => {
        this.alertMessageService.success(data.message);
        this.loading = false;
      }, error => {
        this.alertMessageService.error(error);
        this.loading = false;
      });
  }

  public onReady(editor) {
    editor.ui.view.editable.element.parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.view.editable.element
    );
  }

  getDocumentoContrato() {
    this.modeloDocumentoService.getDocumentoContrato(this.idModeloDocumento, this.idContrato)
      .subscribe(data => {
        this.contrato.contrato = data;
      }, error => {

      });
  }

}
