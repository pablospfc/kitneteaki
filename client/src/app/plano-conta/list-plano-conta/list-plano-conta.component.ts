import { Component, OnInit, TemplateRef } from '@angular/core';
import { AlertMessageService } from 'src/app/_services/alert-message.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { PlanoContaService } from 'src/app/_services/plano-conta.service';
import { NewPlanoContaModalComponent } from '../new-plano-conta-modal/new-plano-conta-modal.component';

@Component({
  selector: 'app-list-plano-conta',
  templateUrl: './list-plano-conta.component.html',
  styleUrls: ['./list-plano-conta.component.scss']
})
export class ListPlanoContaComponent implements OnInit {

  public planosContas = [];
  public page = 1;
  public totalRec;
  public id;
  public loading;
  modalRef: BsModalRef;
  
  constructor(private planoContaService: PlanoContaService,
              private alertService: AlertMessageService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.loading = true;
    this.planoContaService.list()
      .subscribe(data => {
        this.planosContas = data;
        this.loading = false;
        this.totalRec = this.planosContas.length;
      }, error => {
        this.loading = false;
      });
  }

  openModalForm(id) {
    this.modalRef = this.modalService.show(NewPlanoContaModalComponent, {
      initialState: {
        id: id,
      }
    });

    this.modalService.onHide.subscribe((reason: string) => {
      this.list();
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
    this.planoContaService.remove(this.id)
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
