import {Component, OnInit} from '@angular/core';
import {Conta} from "../../_models/conta.model";
import {NgForm} from "@angular/forms";
import {ContaService} from "../../_services/conta.service";
import {AlertMessageService} from "../../_services/alert-message.service";
import {ImovelService} from "../../_services/imovel.service";
import {PlanoContaService} from "../../_services/plano-conta.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-conta',
  templateUrl: './new-conta.component.html',
  styleUrls: ['./new-conta.component.scss']
})
export class NewContaComponent implements OnInit {

  public conta: Conta;
  public loading: boolean;
  public planos = [];
  public imoveis = [];

  constructor(private contaService: ContaService,
              private imovelService: ImovelService,
              private planoContaService: PlanoContaService,
              private route: Router,
              private actRoute: ActivatedRoute,
              private alertService: AlertMessageService) {}

  ngOnInit() {
    this.conta = new Conta();
    this.actRoute.data.subscribe(data => {
      this.conta = data.conta;
      this.getPlanosConta(this.conta.id_tipo_conta);
    });
    this.getImoveis();
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    this.contaService.save(form.value)
      .subscribe(response => {
        this.alertService.success(response.message);
        this.loading = false;
      }, error => {
        console.log(error);
        this.alertService.error(error.message);
        this.loading = false;
      });
  }

  getPlanosConta(idTipoConta: number) {
    this.planoContaService.getByTipoConta(idTipoConta)
      .subscribe(data => {
        this.planos = data;
      }, error => {

      });
  }

  getImoveis() {
    this.imovelService.list()
      .subscribe(data => {
        this.imoveis = data;
      }, error => {

      });
  }


}
