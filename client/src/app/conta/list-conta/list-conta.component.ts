import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ContaService} from "../../_services/conta.service";
import {AlertMessageService} from "../../_services/alert-message.service";

@Component({
  selector: 'app-list-conta',
  templateUrl: './list-conta.component.html',
  styleUrls: ['./list-conta.component.scss']
})
export class ListContaComponent implements OnInit {

  public loading = false;
  public id;
  public contas = [];
  public totalRec;
  public page = 1;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
              private alertService: AlertMessageService,
              private contaService: ContaService) { }

  ngOnInit() {
    this.list();
  }

  decline(): void {
    this.modalRef.hide();
  }

  list() {
    this.loading = true;
    this.contaService.list()
      .subscribe(data => {
        this.contas = data;
        this.loading = false;
        this.totalRec = this.contas.length;
      }, error => {
        this.alertService.error(error);
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

}
