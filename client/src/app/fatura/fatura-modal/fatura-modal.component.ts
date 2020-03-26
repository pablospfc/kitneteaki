import {Component, Input, OnInit} from '@angular/core';
import {Parcela} from '../../_models/parcela.model';
import {NgForm} from '@angular/forms';
import {ParcelaService} from '../../_services/parcela.service';
import {ParcelaItemService} from '../../_services/parcela-item.service';
import {AlertMessageService} from '../../_services/alert-message.service';
import {ItemService} from '../../_services/item.service';
import {ParcelaItem} from '../../_models/parcela-item.model';

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

  //newAttributes: any = {}
  public loading = false;

  constructor(private parcelaService: ParcelaService,
              private parcelaItemService: ParcelaItemService,
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
    console.log(form.value);
  }

  getById(id: number) {
    this.parcelaService.getById(id)
      .subscribe(data => {
        this.parcela = data;
      }, error => {

      });
  }

  loadGrid() {

  }

  addField() {
    this.itemsParcela.push({
      id: '',
      id_item: '',
      id_parcela: '',
      valor: '',
    });
    //this.newAttributes = {};
    //console.log(this.itemsParcela);
  }

  remove(index, id) {
    this.loading = true;
    if (!id) {
      this.itemsParcela.splice(index, 1);
      this.loading = false;
    } else {
      this.itemsParcela.splice(index, 1);
      this.loading = false;
      /*
      this.parcelaItemService.excluir(id)
        .subscribe(data => {
          this.itemsParcela.splice(index, 1);
          console.log(this.itemsParcela);
          this.loading = false;
        }, error => {
          this.alertMessage.error(error);
          this.loading = false;
        });
        */

    }
    //console.log(this.itemsParcela);
  }

  getItemsParcela(id: number) {
    this.loading = true;
    this.parcelaItemService.getByParcela(this.id)
      .subscribe(data => {
        this.itemsParcela = data;
        this.loading = false;
      }, error => {
        this.alertMessage.error(error);
        this.loading = false;
      });
  }

  enableEdit() {

  }

  getItens() {
    this.itemService.list()
      .subscribe(data => {
        this.itens = data;
      }, error => {

      });
  }

}
