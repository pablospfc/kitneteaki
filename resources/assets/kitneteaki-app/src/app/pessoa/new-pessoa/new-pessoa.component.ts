import { Component, OnInit } from '@angular/core';
import {Pessoa} from "../shared/pessoa.model";
import {NgForm} from "@angular/forms";
import {PessoaService} from "../shared/pessoa.service";

@Component({
  selector: 'app-new-pessoa',
  templateUrl: './new-pessoa.component.html',
  styleUrls: ['./new-pessoa.component.scss']
})
export class NewPessoaComponent implements OnInit {

  pessoa: Pessoa;
  public error = null;
  public success = null;
  formValue: any;
  constructor(private pessoaServie: PessoaService) {

  }

  ngOnInit() {
    this.pessoa = new Pessoa();
  }

  onSubmit(form: NgForm) {
    this.formValue = form.value;
    return this.pessoaServie.save(form.value)
      .subscribe(success => {
        this.success = success;
        console.log(this.success);
      },
        error => {
        this.error = error.message;
        console.log(this.error);
        });
  }



}
