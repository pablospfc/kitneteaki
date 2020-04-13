import {Component, OnInit} from '@angular/core';
import {Imovel} from '../../_models/imovel.model';
import {NgForm} from '@angular/forms';
import {ImovelService} from '../../_services/imovel.service';
import {AlertMessageService} from '../../_services/alert-message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CepService} from '../../_services/cep.service';

@Component({
  selector: 'app-new-imovel',
  templateUrl: './new-imovel.component.html',
  styleUrls: ['./new-imovel.component.scss']
})
export class NewImovelComponent implements OnInit {

  public imovel: Imovel;
  public loading = false;

  constructor(private imovelService: ImovelService,
              private alertService: AlertMessageService,
              private actRoute: ActivatedRoute,
              private router: Router,
              private cepService: CepService) {
  }

  ngOnInit() {
    this.imovel = new Imovel();
    this.actRoute.data.subscribe(data => {
      this.imovel = data.imovel;
    });
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    this.imovelService.save(form.value)
      .subscribe(success => {
        const message = (success as any).message;
        this.alertService.success(message);
        this.loading = false;
        window.scroll(0,0);
        setTimeout(() => {
            this.router.navigate(['list-imovel']);
          },
          5000);
      }, error => {
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
          this.imovel.logradouro = dados.logradouro;
          this.imovel.bairro = dados.bairro;
          this.imovel.cidade = dados.localidade;
          this.imovel.estado = dados.uf;
          this.loading = false;
        },
        error => {
          this.loading = false;
        });
  }

}
