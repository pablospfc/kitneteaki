import {Component, OnInit} from '@angular/core';
import {ContratoService} from '../../_services/contrato.service';

@Component({
  selector: 'app-list-contrato',
  templateUrl: './list-contrato.component.html',
  styleUrls: ['./list-contrato.component.scss']
})
export class ListContratoComponent implements OnInit {

  contratos = [];

  constructor(private contratoService: ContratoService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    return this.contratoService.list()
      .subscribe(success => {
        this.contratos = success;
      });
  }

}
