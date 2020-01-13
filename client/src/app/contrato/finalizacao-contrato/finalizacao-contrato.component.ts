import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AlertMessageService} from "../../_services/alert-message.service";
import {ItemService} from "../../_services/item.service";
import {ItemContrato} from "../../_models/item-contrato.model";
import {ItemContratoService} from "../../_services/item-contrato.service";
import {NgForm} from "@angular/forms";
import {ParcelaService} from "../../_services/parcela.service";

@Component({
  selector: 'app-finalizacao-contrato',
  templateUrl: './finalizacao-contrato.component.html',
  styleUrls: ['./finalizacao-contrato.component.scss']
})
export class FinalizacaoContratoComponent implements OnInit {

  public idContrato;
  public itens = [];
  public itemcontrato: ItemContrato;
  public itensContrato = [];
  public loading = false;
  public parcelas = [];
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
    this.itemcontrato = new ItemContrato();
    this.getItens();
    this.getItensContrato();
    this.getParcelas();
  }

  openModalItemContrato(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

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

  addItemContrato(form: NgForm) {
    this.loading = true;
    form.value.id_contrato = this.idContrato;
    this.itemContratoService.save(form.value)
      .subscribe(success => {
        this.alertService.success(success.message);
        this.loading = false;
      }, error => {
        this.alertService.error(error.message);
        this.loading = false;
      });
  }



}
