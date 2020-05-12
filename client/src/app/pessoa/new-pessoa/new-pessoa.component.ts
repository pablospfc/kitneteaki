import { Component, OnInit } from '@angular/core';
import {Pessoa} from '../../_models/pessoa.model';
import {NgForm} from '@angular/forms';
import {PessoaService} from '../../_services/pessoa.service';
import {AlertMessageService} from '../../_services/alert-message.service';
import {ActivatedRoute, Resolve, Router} from '@angular/router';
import {CepService} from "../../_services/cep.service";

@Component({
  selector: 'app-new-pessoa',
  templateUrl: './new-pessoa.component.html',
  styleUrls: ['./new-pessoa.component.scss']
})
export class NewPessoaComponent implements OnInit {

  public pessoa: Pessoa;
  public loading;
  formValue: any;
  constructor(private pessoaService: PessoaService,
              private alertService: AlertMessageService,
              private cepService: CepService,
              private actRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.pessoa = new Pessoa();
    this.actRoute.data.subscribe(data => {
      this.pessoa = data.pessoa;
    });
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    this.formValue = form.value;
    this.pessoaService.save(form.value)
      .subscribe(success => {
          const message = (success as any).message;
          this.alertService.success(message);
          this.loading = false;
          window.scroll(0,0);
          setTimeout(() => {
              this.router.navigate(['list-pessoa']);
            },
            5000);
        },
        error => {
          const message = (error as any).message;
          this.alertService.error(message);
          this.loading = false;
        });
  }

  getCEP(cep: string) {
    this.loading = true;
    this.cepService.buscaCEP(cep)
      .subscribe(success => {
          const dados = (success as any);
          this.pessoa.logradouro = dados.logradouro;
          this.pessoa.bairro = dados.bairro;
          this.pessoa.cidade = dados.localidade;
          this.pessoa.estado = dados.uf;
          this.pessoa.complemento = dados.complemento;
          this.loading = false;
        },
        error => {
          this.loading = false;
        });
  }



}
