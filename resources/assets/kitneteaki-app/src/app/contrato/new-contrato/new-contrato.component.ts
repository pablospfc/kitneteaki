import { Component, OnInit } from '@angular/core';
import {Contrato} from '../../_models/contrato.model';
import {NgForm} from '@angular/forms';
import {ContratoService} from '../../_services/contrato.service';
import {AlertService} from '../../_services/alert.service';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import {ImovelService} from "../../_services/imovel.service";
import {Imovel} from "../../_models/imovel.model";
import {PessoaService} from "../../_services/pessoa.service";
@Component({
  selector: 'app-new-contrato',
  templateUrl: './new-contrato.component.html',
  styleUrls: ['./new-contrato.component.scss'],
  providers: [DatePipe]
})
export class NewContratoComponent implements OnInit {

  contrato: Contrato;
  public imoveis = [];
  public locatarios = [];
  constructor(private contratoService: ContratoService,
              private alertService: AlertService,
              private imovelService: ImovelService,
              private pessoaService: PessoaService,
              private router: Router,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.contrato = new Contrato();
    this.getImoveis();
    this.getLocatarios();
  }

  onSubmit(form: NgForm) {
    return this.contratoService.save(form.value)
      .subscribe(success => {
        const message = (success as any).message;
        this.alertService.success(message, true);
        //this.router.navigate(['new-ocupantes-imovel']);
      }, error => {
        const message = (error as any).message;
        this.alertService.error(message);
      });
  }

  calcularFimContrato(data: Date, vigencia: number) {
    /*
    const date = new Date(data);
    console.log('Inicio de Contrato: ' + date);
    let dataFim: Date;
    date.setMonth(date.getMonth() + vigencia);
    const DateTmp: string = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log('Data Final: ' + dataFim);
    this.contrato.data_fim = dataFim;
    */
    let dataInicial = moment(data);
    let dataFinal = moment(dataInicial).add(vigencia, 'M');
    console.log(dataFinal.format('YYYY-MM-DD'));
    this.contrato.data_fim = dataFinal.format('YYYY-MM-DD');
  }

  getImoveis() {
    return this.imovelService.list()
      .subscribe(success => {
        this.imoveis = success;
      });
  }

  getLocatarios() {
    return this.pessoaService.getInquilinos()
      .subscribe(success => {
        this.locatarios = success;
      });
  }

}
