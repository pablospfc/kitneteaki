import { Component, OnInit } from '@angular/core';
import {ImovelService} from "../../_services/imovel.service";

@Component({
  selector: 'app-list-imovel',
  templateUrl: './list-imovel.component.html',
  styleUrls: ['./list-imovel.component.scss']
})
export class ListImovelComponent implements OnInit {

  public imoveis = [];
  constructor(private imovelService: ImovelService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    return this.imovelService.list()
      .subscribe( response => {
        this.imoveis = response;
      });
  }

}
