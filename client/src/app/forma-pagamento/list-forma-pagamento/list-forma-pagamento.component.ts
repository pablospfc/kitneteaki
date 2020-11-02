import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormaPagamentoService } from 'src/app/_services/forma-pagamento.service';
import { AlertMessageService } from 'src/app/_services/alert-message.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NewFormaPagamentoModalComponent } from '../new-forma-pagamento-modal/new-forma-pagamento-modal.component';

@Component({
  selector: 'app-list-forma-pagamento',
  templateUrl: './list-forma-pagamento.component.html',
  styleUrls: ['./list-forma-pagamento.component.scss']
})
export class ListFormaPagamentoComponent implements OnInit {

  public formasPagamento = [];
  public loading;
  public page = 1;
  public totalRec;
  public id;
  modalRef: BsModalRef;

  constructor(private formaPagamentoService: FormaPagamentoService,
              private alertService: AlertMessageService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.list();
  }

  list(){
    this.loading = true;
    this.formaPagamentoService.list()
    .subscribe(data => {
      this.formasPagamento = data;
      this.totalRec = this.formasPagamento.length;
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  openModalForm(id: any = null) {
    this.modalRef = this.modalService.show(NewFormaPagamentoModalComponent, {
      initialState: {
        id: id,
      }
    });

    this.modalService.onHide.subscribe((reason: string) => {
      this.list();
    });
  }

  openModalConfirmRemove(template: TemplateRef<any>, id: any){
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
    this.formaPagamentoService.remove(this.id)
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
