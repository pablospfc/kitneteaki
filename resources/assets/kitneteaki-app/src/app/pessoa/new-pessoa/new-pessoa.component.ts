import { Component, OnInit } from '@angular/core';
import {Pessoa} from "../../_models/pessoa.model";
import {NgForm} from "@angular/forms";
import {PessoaService} from "../../_services/pessoa.service";
import {AlertService} from "../../_services/alert.service";
import {ActivatedRoute, Resolve} from "@angular/router";

@Component({
  selector: 'app-new-pessoa',
  templateUrl: './new-pessoa.component.html',
  styleUrls: ['./new-pessoa.component.scss']
})
export class NewPessoaComponent implements OnInit {

  public pessoa: Pessoa;
  formValue: any;
  constructor(private pessoaService: PessoaService, private alertService: AlertService, private actRoute: ActivatedRoute) {
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
          this.alertService.success(message, true);
      },
        error => {
          const message = (error as any).message;
          this.alertService.error(message);
        });
  }



}
