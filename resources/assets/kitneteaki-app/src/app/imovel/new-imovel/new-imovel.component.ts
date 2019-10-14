import { Component, OnInit } from '@angular/core';
import {Imovel} from "../../_models/imovel.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-new-imovel',
  templateUrl: './new-imovel.component.html',
  styleUrls: ['./new-imovel.component.scss']
})
export class NewImovelComponent implements OnInit {

  imovel: Imovel;
  constructor() { }

  ngOnInit() {
    this.imovel = new Imovel();
  }

  onSubmit(form: NgForm) {

  }

}
