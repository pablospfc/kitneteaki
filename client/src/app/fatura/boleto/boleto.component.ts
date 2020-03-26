import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ParcelaService} from "../../_services/parcela.service";

@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.scss']
})
export class BoletoComponent implements OnInit {

  public id;
  public boleto;
  constructor(private parcelaService: ParcelaService,
              private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
  }

  ngOnInit() {
    this.gerarBoleto();
  }

  gerarBoleto() {
   this.parcelaService.gerarBoleto()
     .subscribe(response => {
       this.boleto = response;
     }, error => {

     });
  }

}
