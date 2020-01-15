import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AlertMessageService} from '../../_services/alert-message.service';
import {ItemService} from '../../_services/item.service';
import {ItemContratoService} from '../../_services/item-contrato.service';
import {ParcelaService} from '../../_services/parcela.service';
import {ItensContratoModalComponent} from '../itens-contrato-modal/itens-contrato-modal.component';

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
              private parcelaService: ParcelaService) {
    this.route.params.subscribe((params: Params) => {
      this.idContrato = params.id;
    });
  }

  ngOnInit() {
    this.getItensContrato();
    this.getParcelas();
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

  }

  removeOcupante(id) {

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

  gerarParcelas() {

  }

  getParcelas() {
     this.parcelaService.getByContrato(this.idContrato)
      .subscribe(data => {
        this.parcelas = data;
      });
  }

  getItensContrato() {
    this.loading = true;
    this.itemContratoService.getByContrato(this.idContrato)
      .subscribe(data => {
        this.itensContrato = data;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  decline(): void {
    this.modalRef.hide();
  }



}
