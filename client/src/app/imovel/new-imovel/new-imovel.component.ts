import {Component, OnInit} from '@angular/core';
import {Imovel} from '../../_models/imovel.model';
import {NgForm} from '@angular/forms';
import {ImovelService} from '../../_services/imovel.service';
import {AlertService} from '../../_services/alert.service';
import {ActivatedRoute} from '@angular/router';
import {CepService} from "../../_services/cep.service";

@Component({
  selector: 'app-new-imovel',
  templateUrl: './new-imovel.component.html',
  styleUrls: ['./new-imovel.component.scss']
})
export class NewImovelComponent implements OnInit {

  public imovel: Imovel;

  constructor(private imovelService: ImovelService, private alertService: AlertService, private actRoute: ActivatedRoute, private cepService: CepService) {
  }

  ngOnInit() {
    this.imovel = new Imovel();
    this.actRoute.data.subscribe(data => {
      this.imovel = data.imovel;
    });
  }

  onSubmit(form: NgForm) {
    this.imovelService.save(form.value)
      .subscribe(success => {
        const message = (success as any).message;
        this.alertService.success(message, true);
      }, error => {
        const message = (error as any).message;
        this.alertService.error(message);
      });
  }

  getCEP(cep: string) {
    this.cepService.buscaCEP(cep)
      .subscribe(success => {
          let dados = (success as any);
          this.imovel.logradouro = dados.logradouro;
          this.imovel.bairro = dados.bairro;
          this.imovel.cidade = dados.localidade;
          this.imovel.estado = dados.uf;
        },
        error => {
          console.log(error);
        });
  }

}
