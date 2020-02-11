import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AlertMessageService} from '../../_services/alert-message.service';
import {ItemService} from '../../_services/item.service';
import {ItemContratoService} from '../../_services/item-contrato.service';
import {ParcelaService} from '../../_services/parcela.service';
import {ItensContratoModalComponent} from '../itens-contrato-modal/itens-contrato-modal.component';
import {GeracaoParcelasModalComponent} from '../geracao-parcelas-modal/geracao-parcelas-modal.component';
import {ContratoService} from "../../_services/contrato.service";

@Component({
  selector: 'app-finalizacao-contrato',
  templateUrl: './finalizacao-contrato.component.html',
  styleUrls: ['./finalizacao-contrato.component.scss']
})
export class FinalizacaoContratoComponent implements OnInit {

  public idContrato;
  public itensContrato = [];
  public loading = false;
  public parcelas = [];
  public id: number;
  public item: string;
  modalRef: BsModalRef;
  constructor(private route: ActivatedRoute,
              private modalService: BsModalService,
              private alertService: AlertMessageService,
              private itemService: ItemService,
              private itemContratoService: ItemContratoService,
              private contratoService: ContratoService,
              private router: Router,
              private parcelaService: ParcelaService) {
    this.route.params.subscribe((params: Params) => {
      this.idContrato = params.id;
    });
  }

  ngOnInit() {
    this.getItensContrato();
    this.getParcelas();
  }

  concluirContrato() {
    this.loading = true;
    this.contratoService.concluirContrato(this.idContrato)
     .subscribe(data => {
       this.alertService.success(data.message);
       this.loading = false;
       setTimeout(() => {
           this.router.navigate(['list-contrato']);
         },
         5000);
     }, error => {
       this.alertService.error(error.message);
       this.loading = false;
     });
  }

  openModalConfirmRemove(item: string, template: TemplateRef<any>, id: number) {
    this.id = id;
    this.item = item;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm',
      initialState: {
        id: id
      }
    });
  }

  confirmRemove() {
    switch (this.item) {
      case 'item-contrato': {
        this.removeOcupante(this.id);
        break;
      }
      case 'parcela': {
        this.removeParcela(this.id);
        break;
      }
    }
  }

  removeParcela(id) {
    this.loading = true;
    this.parcelaService.delete(id)
     .subscribe(data => {
       this.alertService.success(data.message);
       this.loading = false;
     }, error => {
       this.alertService.error(error.message);
       this.loading = false;
     });
  }

  removeOcupante(id) {
    this.loading = true;
    this.itemContratoService.delete(id)
     .subscribe(data => {
       this.alertService.success(data.message);
       this.loading = false;
     }, error => {
       this.alertService.error(error);
       this.loading = false;
     });
    this.modalRef.hide();
    this.getItensContrato();
  }

  openModalItemContrato(id: number = null) {
    this.modalRef = this.modalService.show(ItensContratoModalComponent, {
      initialState: {
        id: id,
        idContrato: this.idContrato
      }
    });

    this.modalService.onHide.subscribe((reason: string) => {
      this.getItensContrato();
    });
  }

  openModalGeracaoParcelas() {
    this.modalRef = this.modalService.show(GeracaoParcelasModalComponent, {
      initialState: {
        idContrato: this.idContrato
      }
    });

    this.modalService.onHide.subscribe((reason: string) => {
      this.getParcelas();
    });
  }

  openModalParcela(id: number = null) {
    this.modalRef = this.modalService.show(ItensContratoModalComponent, {
      initialState: {
        id: id,
        idContrato: this.idContrato
      }
    });
  }

  getParcelas() {
    this.loading = true;
     this.parcelaService.getByContrato(this.idContrato)
      .subscribe(data => {
        this.parcelas = data;
        this.loading = false;
      }, error => {
        this.alertService.error(error.message);
        this.loading = false;
      });
  }

  getItensContrato() {
    this.loading = true;
    this.itemContratoService.getByContrato(this.idContrato)
      .subscribe(data => {
        this.itensContrato = data;
        this.loading = false;
      }, error => {
        this.alertService.error(error.message);
        this.loading = false;
      });
  }

  decline(): void {
    this.modalRef.hide();
  }



}