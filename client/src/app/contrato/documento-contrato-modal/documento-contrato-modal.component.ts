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
  public contrato: Contrato;

  constructor(private modeloDocumentoService: ModeloDocumentoService,
              private alertMessageService: AlertMessageService,
              public modalRef: BsModalRef,
              private contratoService: ContratoService) {
  }

  ngOnInit() {
    this.contrato = new Contrato();
    //this.getById(this.idContrato);
    this.getDocumentoContrato(this.idContrato);
  }

  public onSubmit(form: NgForm) {
    this.loading = true;
    this.contrato.id = this.idContrato;
    this.contrato.id_modelo_documento = this.idModeloDocumento;
    this.contrato.contrato = form.value.contrato;
    this.contratoService.setDocumentoContrato(this.contrato)
      .subscribe(data => {
        this.alertMessageService.success(data.message);
        this.loading = false;
      }, error => {
        this.alertMessageService.error(error);
        this.loading = false;
      });
  }

  public getById(id) {
    this.contratoService.getById(id)
      .subscribe(data => {
        this.contrato = data;
        console.log(this.contrato);
      }, error => {

      });
  }

  public onReady(editor) {
    editor.ui.view.editable.element.parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.view.editable.element
    );
  }

  getDocumentoContrato(idContrato) {
    this.loading = true;
    this.contratoService.getById(idContrato)
      .subscribe(data => {
        this.contrato.contrato = data.contrato;
        if (this.contrato.contrato === null) {
          this.modeloDocumentoService.getDocumentoContrato(this.idModeloDocumento, this.idContrato)
            .subscribe(res => {
              this.contrato.contrato = res;
              console.log(this.contrato.contrato);
              this.loading = false;
            }, error => {
              this.alertMessageService.error(error);
              this.loading = false;
            });
        }
        this.loading = false;
      }, error => {
        this.loading = false;
      });

  }

}
