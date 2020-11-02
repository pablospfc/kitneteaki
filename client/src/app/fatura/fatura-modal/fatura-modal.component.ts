import {Component, Input, OnInit} from '@angular/core';
import {Parcela} from '../../_models/parcela.model';
import {NgForm} from '@angular/forms';
import {ParcelaService} from '../../_services/parcela.service';
import {ParcelaItemService} from '../../_services/parcela-item.service';
import {AlertMessageService} from '../../_services/alert-message.service';
import {ItemService} from '../../_services/item.service';
import {ParcelaItem} from '../../_models/parcela-item.model';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-fatura-modal',
  templateUrl: './fatura-modal.component.html',
  styleUrls: ['./fatura-modal.component.scss']
})

export class FaturaModalComponent implements OnInit {

  @Input() id: number;
  parcela: Parcela;
  parcelaItem: ParcelaItem;
  itemsParcela: Array<any> = [];
  isEditItems: boolean;
  itens = [];

  newAttributes: any = {
    id: null,
    id_item: null,
    id_parcela: null,
    valor: null,
  };

  public dados: any =  {
    id: null,
    id_forma_pagamento: null,
    data_vencimento: null,
    itens: null
  };

  public loading = false;

  constructor(private parcelaService: ParcelaService,
              private parcelaItemService: ParcelaItemService,
              public modalRef: BsModalRef,
              private alertMessage: AlertMessageService,
              private itemService: ItemService) {
  }

  ngOnInit() {
    this.parcela = new Parcela();
    this.parcelaItem = new ParcelaItem();
    if (this.id) {
      this.getById(this.id);
    }

    this.getItemsParcela(this.id);
    this.getItens();
  }

  updateFatura(form: NgForm) {
    this.dados = {
      id: form.value.id,
      id_forma_pagamento: form.value.id_forma_pagamento,
      data_vencimento: form.value.data_vencimento,
      itens: this.itemsParcela
    };

    this.parcelaService.update(this.dados)
      .subscribe(data => {
        this.alertMessage.success(data.message);
      }, error => {
        this.alertMessage.error(error.message);
      });
  }

  getById(id: number) {
    this.parcelaService.getById(id)
      .subscribe(data => {
        this.parcela = data;
      }, error => {

      });
  }

  addField() {
    this.itemsParcela.push({
      id: '',
      id_item: '',
      id_parcela: this.id,
      valor: '',
    });
  }

  remove(index, id) {
    this.loading = true;
    if (!id) {
      this.itemsParcela.splice(index, 1);
      this.loading = false;
      window.scroll(0, 0);
    } else {
      this.parcelaItemService.excluir(id)
        .subscribe(data => {
          this.itemsParcela.splice(index, 1);
          this.alertMessage.success(data.message);
          this.loading = false;
        }, error => {
          this.alertMessage.error(error);
          this.loading = false;
        });
    }
  }

  getItemsParcela(id: number) {
    this.loading = true;
    this.parcelaItemService.getByParcela(this.id)
      .subscribe(data => {
        this.itemsParcela = data;
        this.loading = false;
      }, error => {
        console.log(error);
        this.alertMessage.error(error.message);
        this.loading = false;
      });
  }

  getItens() {
    this.itemService.list()
      .subscribe(data => {
        this.itens = data;
      }, error => {

      });
  }

}
