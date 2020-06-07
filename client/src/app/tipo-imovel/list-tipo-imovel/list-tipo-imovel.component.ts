import {Component, OnInit, TemplateRef} from '@angular/core';
import {TipoImovelService} from "../../_services/tipo-imovel.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AlertMessageService} from "../../_services/alert-message.service";
import {FiadoresContratoModalComponent} from "../../contrato/fiadores-contrato-modal/fiadores-contrato-modal.component";
import {NewTipoImovelModalComponent} from "../new-tipo-imovel-modal/new-tipo-imovel-modal.component";

@Component({
  selector: 'app-list-tipo-imovel',
  templateUrl: './list-tipo-imovel.component.html',
  styleUrls: ['./list-tipo-imovel.component.scss']
})
export class ListTipoImovelComponent implements OnInit {

  public tiposImoveis = [];
  public loading;
  public page = 1;
  public id;
  public totalRec;
  modalRef: BsModalRef;

  constructor(private tipoImovelService: TipoImovelService,
              private alertService: AlertMessageService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.loading = true;
    this.tipoImovelService.list()
      .subscribe(data => {
        this.tiposImoveis = data;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
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
    this.tipoImovelService.remove(this.id)
      .subscribe(response => {
        this.alertService.success(response.message);
        this.loading = false;
      }, error => {
        this.alertService.error(error.message);
        this.loading = false;
      });

    this.modalRef.hide();
    this.list();
  }

  openModalForm(id: number = null) {
    this.modalRef = this.modalService.show(NewTipoImovelModalComponent, {
      initialState: {
        id: id,
      }
    });

    this.modalService.onHide.subscribe((reason: string) => {
      this.list();
    });
  }

  decline(): void {
    this.modalRef.hide();
  }

}
