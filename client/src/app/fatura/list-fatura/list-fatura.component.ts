import { Component, OnInit } from '@angular/core';
import {ParcelaService} from "../../_services/parcela.service";
import {ImovelService} from "../../_services/imovel.service";
import {PessoaService} from "../../_services/pessoa.service";
import {AlertMessageService} from "../../_services/alert-message.service";

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
  constructor(private parcelaService: ParcelaService,
              private imovelService: ImovelService,
              private pessoaService: PessoaService,
              private alertService: AlertMessageService) { }

  ngOnInit() {
    this.listParcelas();
    this.getImoveis();
    this.getInquilinos();
  }

  getImoveis() {
    this.imovelService.list()
      .subscribe(response => {
        this.imoveis = response;
      }, error => {

      });
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
    this.parcelaService.listParcelas()
      .subscribe(response => {
        this.parcelas = response;
        this.totalRec = this.parcelas.length;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

}
