import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AlertMessageService} from '../../_services/alert-message.service';
import {ItemService} from "../../_services/item.service";
import {NewTipoImovelModalComponent} from "../../tipo-imovel/new-tipo-imovel-modal/new-tipo-imovel-modal.component";
import {NewItemModalComponent} from "../new-item-modal/new-item-modal.component";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  public itens = [];
  public loading;
  public page = 1;
  public id;
  public totalRec;
  modalRef: BsModalRef;

  constructor(private itemService: ItemService,
              private alertService: AlertMessageService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.loading = true;
    this.itemService.list()
      .subscribe(response => {
        this.itens = response;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  openModalForm(id: any = null) {
    this.modalRef = this.modalService.show(NewItemModalComponent, {
      initialState: {
        id: id,
      }
    });

    this.modalService.onHide.subscribe((reason: string) => {
      this.list();
    });
  }

  openModalConfirmRemove(template: TemplateRef<any>, id: any) {
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
    this.itemService.remove(this.id)
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

  decline() {
    this.modalRef.hide();
  }
}
