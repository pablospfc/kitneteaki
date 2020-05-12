import {Component, OnInit} from '@angular/core';
import {ParcelaService} from "../../_services/parcela.service";
import {ImovelService} from "../../_services/imovel.service";
import {PessoaService} from "../../_services/pessoa.service";
import {AlertMessageService} from "../../_services/alert-message.service";
import {NgForm} from '@angular/forms';
import {BsModalService} from "ngx-bootstrap/modal";
import {FaturaModalComponent} from "../fatura-modal/fatura-modal.component";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

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

  constructor(private parcelaService: ParcelaService,
              private imovelService: ImovelService,
              private pessoaService: PessoaService,
              private modalService: BsModalService,
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
        this.loading = false;
      });


  }

}
