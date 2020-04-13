import {Component, OnInit, TemplateRef} from '@angular/core';
import {ContratoService} from '../../_services/contrato.service';
import {AlertMessageService} from "../../_services/alert-message.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-list-contrato',
  templateUrl: './list-contrato.component.html',
  styleUrls: ['./list-contrato.component.scss']
})
export class ListContratoComponent implements OnInit {

  contratos = [];
  public loading = false;
  public totalRec;
  public page = 1;
  public id;
  modalRef: BsModalRef;

  constructor(private contratoService: ContratoService,
              private modalService: BsModalService,
              private alertMessageService: AlertMessageService) {
  }

  ngOnInit() {
    this.getAll();
  }

  openModalConfirmRemove(template: TemplateRef<any>, id: number) {
    this.id = id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm',
      initialState: {
        id: id
      }
    });
  }

  confirmRemove() {
    this.loading = true;
    this.contratoService.delete(this.id)
      .subscribe(data => {
        this.alertMessageService.success(data.message);
        this.loading = false;
      }, error => {
        this.alertMessageService.error(error.message);
        this.loading = false;
      });

    this.modalRef.hide();
    this.getAll();
  }

  decline(): void {
    this.modalRef.hide();
  }

  getAll() {
    this.loading = true;
    return this.contratoService.list()
      .subscribe(success => {
        this.contratos = success;
        this.loading = false;
        this.totalRec = this.contratos.length;
        this.page = 1;
      }, error => {
        console.log(error);
        this.alertMessageService.error(error.message);
        this.loading = false;
      });
  }

}
