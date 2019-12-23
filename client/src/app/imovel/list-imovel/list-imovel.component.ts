import {Component, OnInit} from '@angular/core';
import {ImovelService} from '../../_services/imovel.service';

@Component({
  selector: 'app-list-imovel',
  templateUrl: './list-imovel.component.html',
  styleUrls: ['./list-imovel.component.scss']
})
export class ListImovelComponent implements OnInit {

  public imoveis = [];
  public page = 1;
  public totalRec;
  public loading = false;
  constructor(private imovelService: ImovelService) {
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.loading = true;
    return this.imovelService.list()
      .subscribe(response => {
        this.imoveis = response;
        this.totalRec = this.imoveis.length;
        this.loading = false;
      });
  }

}
