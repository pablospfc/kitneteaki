import {Component, OnInit, TemplateRef} from '@angular/core';
import {ParcelaService} from "../../_services/parcela.service";
import {ImovelService} from "../../_services/imovel.service";
import {PessoaService} from "../../_services/pessoa.service";
import {AlertMessageService} from "../../_services/alert-message.service";
import {NgForm} from '@angular/forms';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FaturaModalComponent} from "../fatura-modal/fatura-modal.component";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {PagamentoFaturaModalComponent} from "../pagamento-fatura-modal/pagamento-fatura-modal.component";

@Component({
  selector: 'app-list-fatura',
  templateUrl: './list-fatura.component.html',
  styleUrls: ['./list-fatura.component.scss']
})
export class ListFaturaComponent implements OnInit {

  public parcelas = [];
  public inquilinos = [];
  public imoveis = [];
  public page = 1;
  public totalRec: number;
  public loading = false;
  public filter = false;
  public boleto;
  public id;
  public filtro = {
    id_locatario: null,
    id_imovel: null,
    id_tipo_imovel: null,
    id_status: null,
    id_tipo_contrato: null,
    id_forma_pagamento: null,
    periodo_final: null,
    periodo_inicial: null
  };
  modalRef: BsModalRef;

  constructor(private parcelaService: ParcelaService,
              private imovelService: ImovelService,
              private pessoaService: PessoaService,
              public modalService: BsModalService,
              private router: Router,
              private alertService: AlertMessageService) {
  }

  ngOnInit() {
    this.listParcelas();
    this.getImoveis();
    this.getInquilinos();
  }

  clear() {
    this.filtro = {
      id_locatario: null,
      id_imovel: null,
      id_tipo_imovel: null,
      id_status: null,
      id_tipo_contrato: null,
      id_forma_pagamento: null,
      periodo_final: null,
      periodo_inicial: null
    };
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

  openModalConfirmLiquidarFatura(template: TemplateRef<any>, id: number) {
    this.id = id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm',
      initialState: {
        id: id
      }
    });
  }

  realizarPagamento() {
    this.loading = true;
    this.parcelaService.realizarPagamento(this.id)
      .subscribe(response => {
        this.alertService.success(response.message);
        this.loading = false;
      }, error => {
        this.alertService.success(error.message);
        this.loading = false;
      });
  }

  openModalPagamento(id: number) {
    this.modalService.show(PagamentoFaturaModalComponent, {
      initialState: {
        id: id
      }
    });

    this.modalService.onHide.subscribe((reason: string) => {
      this.listParcelas();
    });
  }

  decline(): void {
    this.modalRef.hide();
  }

  confirmRemove() {
    this.loading = true;
    this.parcelaService.delete(this.id)
      .subscribe(data => {
        this.alertService.success(data.message);
        this.loading = false;
      }, error => {
        this.alertService.error(error.message);
        this.loading = false;
      });

    this.modalRef.hide();
    this.listParcelas();
  }

  openFilter() {
    if (this.filter === true) {
      this.filter = false;
    } else {
      this.filter = true;
    }
  }

  openModalParcela(id: number) {
    this.modalService.show(FaturaModalComponent, {
      initialState: {
        id: id
      }
    });

    this.modalService.onHide.subscribe((reason: string) => {
      this.listParcelas();
    });
  }

  getImoveis() {
    this.imovelService.list()
      .subscribe(response => {
        this.imoveis = response;
      }, error => {

      });
  }

  gerarBoleto(id: number) {
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`boleto/${id}`])
    );

    window.open('#' + url, '_blank');
  }

  getInquilinos() {
    this.pessoaService.getInquilinos()
      .subscribe(response => {
        this.inquilinos = response;
      }, error => {

      });
  }

  listParcelas() {
    this.loading = true;
    this.parcelaService.listParcelas(this.filtro)
      .subscribe(response => {
        this.parcelas = response;
        this.totalRec = this.parcelas.length;
        this.loading = false;
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      });


  }

}
