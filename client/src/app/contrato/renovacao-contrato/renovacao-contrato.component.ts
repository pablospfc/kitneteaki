import { Component, OnInit } from '@angular/core';
import {Contrato} from '../../_models/contrato.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PessoaService} from '../../_services/pessoa.service';
import {ImovelService} from '../../_services/imovel.service';
import {ContratoService} from '../../_services/contrato.service';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {AlertMessageService} from '../../_services/alert-message.service';

@Component({
  selector: 'app-renovacao-contrato',
  templateUrl: './renovacao-contrato.component.html',
  styleUrls: ['./renovacao-contrato.component.scss']
})
export class RenovacaoContratoComponent implements OnInit {

  contrato: Contrato;
  public imoveis = [];
  public locatarios = [];
  public isValidDateEnd: boolean;
  constructor(private pessoaService: PessoaService,
              private imovelService: ImovelService,
              private contratoService: ContratoService,
              private alertService: AlertMessageService,
              private router: Router,
              private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.contrato = new Contrato();
    this.actRoute.data.subscribe(data => {
      this.contrato = data.contrato;
      this.getImoveis(this.contrato.id_tipo_contrato);
    });
    this.getLocatarios();
    this.cleanContrato();
  }

  onSubmit(form: NgForm) {
    form.value.id_contrato = this.contrato.id;

    return this.contratoService.renew(form.value)
      .subscribe(success => {
        const message = success.message;
        const id = success.id ? success.id : null;
        this.alertService.success(message);
        this.router.navigate(['new-garantias-contrato', id]);
      }, error => {
        const message = error.message;
        this.alertService.error(message);
      });


  }

  // filter the important data
  cleanContrato() {
    this.contrato.referencia = null;
    this.contrato.vigencia = null;
    this.contrato.primeiro_vencimento = null;
    this.contrato.observacoes = null;
    const newInicioContrato = moment(this.contrato.data_fim).add(1, 'days');
    this.contrato.data_inicio = newInicioContrato.format('YYYY-MM-DD');
  }

  getLocatarios() {
    return this.pessoaService.getInquilinos()
      .subscribe(success => {
        this.locatarios = success;
      }, error => {

      });
  }

  getImoveis(idTransacao) {
    return this.imovelService.getByTransacao(idTransacao)
      .subscribe(success => {
        this.imoveis = success;
      });
  }

  getValorImovel(idImovel) {
    return this.imovelService.getById(idImovel)
      .subscribe(response => {
        this.contrato.valor = response.valor_imovel;
        this.contrato.valor_total = response.valor_imovel;
      });
  }

  calcularFimContrato(data: string, vigencia: number) {
    const dataInicial = moment(data);
    const dataFinal = moment(dataInicial).add(vigencia, 'M');
    this.contrato.data_fim = dataFinal.format('YYYY-MM-DD');
  }

  verificaDisponibilidade(inicio: string, fim: string) {
    const inicioEstadia = moment(inicio);
    const fimEstadia = moment(fim);
    if (inicioEstadia != null  && fimEstadia != null) {
      const duration = moment.duration(fimEstadia.diff(inicioEstadia));
      const dias = duration.asDays();
      this.contrato.dias = dias;
    } else {
      this.contrato.dias = 0;
    }
  }

  getValorTotal() {
    this.contrato.dias = this.contrato.dias ? this.contrato.dias : 0;
    this.contrato.valor = this.contrato.valor ? this.contrato.valor : 0;
    if (this.contrato.id_tipo_contrato == 2) {
      this.contrato.valor_total = ((Number.parseFloat(this.contrato.valor.toString()) * Number.parseFloat(this.contrato.dias.toString())));
    } else {
      this.contrato.valor_total = this.contrato.valor;
    }
  }

}
