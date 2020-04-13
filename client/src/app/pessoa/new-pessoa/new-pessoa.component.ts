import { Component, OnInit } from '@angular/core';
import {Pessoa} from '../../_models/pessoa.model';
import {NgForm} from '@angular/forms';
import {PessoaService} from '../../_services/pessoa.service';
import {AlertMessageService} from '../../_services/alert-message.service';
import {ActivatedRoute, Resolve, Router} from '@angular/router';

@Component({
  selector: 'app-new-pessoa',
  templateUrl: './new-pessoa.component.html',
  styleUrls: ['./new-pessoa.component.scss']
})
export class NewPessoaComponent implements OnInit {

  public pessoa: Pessoa;
  formValue: any;
  constructor(private pessoaService: PessoaService,
              private alertService: AlertMessageService,
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
    this.formValue = form.value;
    this.pessoaService.save(form.value)
      .subscribe(success => {
          const message = (success as any).message;
          this.alertService.success(message);
          window.scroll(0,0);
          setTimeout(() => {
              this.router.navigate(['list-pessoa']);
            },
            5000);
        },
        error => {
          const message = (error as any).message;
          this.alertService.error(message);
        });
  }



}
