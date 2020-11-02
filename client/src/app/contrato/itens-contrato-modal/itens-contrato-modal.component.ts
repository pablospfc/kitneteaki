import {Component, Input, OnInit} from '@angular/core';
import {ItemContrato} from '../../_models/item-contrato.model';
import {NgForm} from '@angular/forms';
import {AlertMessageService} from '../../_services/alert-message.service';
import {ItemContratoService} from '../../_services/item-contrato.service';
import {BsModalRef} from 'ngx-bootstrap';
import {ItemService} from "../../_services/item.service";

@Component({
  selector: 'app-itens-contrato-modal',
  templateUrl: './itens-contrato-modal.component.html',
  styleUrls: ['./itens-contrato-modal.component.scss']
})
export class ItensContratoModalComponent implements OnInit {

  @Input() id: number;
  @Input() idContrato: number;
  itemContrato: ItemContrato;
  public itens = [];
  public loading: boolean;
  constructor(private alertService: AlertMessageService,
              private itemContratoService: ItemContratoService,
              private itemService: ItemService,
              public modalRef: BsModalRef) { }

  ngOnInit() {
    this.itemContrato = new ItemContrato();
    this.getItens();
    if (this.id) {
      this.buscar(this.id);
    }
  }

  buscar(id: number) {
    this.loading = true;
    this.itemContratoService.getById(id)
     .subscribe(data => {
       this.itemContrato = data;
       this.loading = false;
     }, error => {
       this.loading = false;
     });
  }

  addItemContrato(form: NgForm) {
    this.loading = true;
    form.value.id_contrato = this.idContrato;
    this.itemContratoService.save(form.value)
      .subscribe(success => {
        this.alertService.success(success.message);
        this.itemContrato = new ItemContrato();
        this.loading = false;
      }, error => {
        this.alertService.error(error.message);
        this.loading = false;
      });
  }

  getItens() {
    this.loading = true;
    this.itemService.list()
      .subscribe(data => {
        this.itens = data;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

}
