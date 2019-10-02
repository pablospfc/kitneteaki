import { Component, OnInit } from '@angular/core';
import {Pessoa} from "../shared/pessoa.model";

@Component({
  selector: 'app-new-pessoa',
  templateUrl: './new-pessoa.component.html',
  styleUrls: ['./new-pessoa.component.scss']
})
export class NewPessoaComponent implements OnInit {

  pessoa: Pessoa;
  constructor() { }

  ngOnInit() {
    this.pessoa = new Pessoa();
  }

  onSubmit() {
   console.log(this.pessoa);
  }

}
