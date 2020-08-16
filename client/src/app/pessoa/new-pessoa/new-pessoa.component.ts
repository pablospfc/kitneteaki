import { Component, OnInit } from '@angular/core';
import {Pessoa} from '../../_models/pessoa.model';
import {NgForm} from '@angular/forms';
import {PessoaService} from '../../_services/pessoa.service';
import {AlertMessageService} from '../../_services/alert-message.service';
import {ActivatedRoute, Resolve, Router} from '@angular/router';
import {CepService} from '../../_services/cep.service';
import {Usuario} from '../../_models/usuario.model';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-new-pessoa',
  templateUrl: './new-pessoa.component.html',
  styleUrls: ['./new-pessoa.component.scss']
})
export class NewPessoaComponent implements OnInit {

  public pessoa: Pessoa;
  public usuario: Usuario;
  public loading;
  public data: any;
  constructor(private pessoaService: PessoaService,
              private alertService: AlertMessageService,
              private cepService: CepService,
              private authService: AuthService,
              private actRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.pessoa = new Pessoa();
    this.usuario = new Usuario();
    this.actRoute.data.subscribe(data => {
      this.pessoa = data.pessoa;
    });
  }

  tratarDados(data) {
  this.data =  {
      data_pessoa: {
        id_estado_civil: data.id_estado_civil,
        id_tipo_pessoa: data.id_tipo_pessoa,
        id_genero: data.id_genero,
        id_categoria_pessoa: data.id_categoria_pessoa,
        id_nacionalidade: data.id_nacionalidade,
        nome: data.nome,
        cpf_cnpj: data.cpf_cnpj,
        rg: data.rg,
        passaporte: data.passaporte,
        data_nascimento: data.data_nascimento,
        orgao_expedidor: data.orgao_expedidor,
        data_emissao: data.data_emissao,
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        complemento: data.complemento,
        cep: data.cep,
        numero: data.numero,
        email: data.email,
        telefone_celular: data.telefone_celular,
        whatsapp: data.whatsapp,
        profissao: data.profissao,
        token: this.authService.getUser().token
      },
      data_usuario: {
        login: data.login,
        password: data.password,
      }
    };
  }


  onSubmit(form: NgForm) {
    this.loading = true;
    this.tratarDados(form.value);
    this.pessoaService.save(this.data)
      .subscribe(success => {
          const message = (success as any).message;
          this.alertService.success(message);
          this.loading = false;
          window.scroll(0, 0);
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

  setLogin(value) {
   this.usuario.login = value;
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
