import { Component, OnInit } from '@angular/core';
import {ModeloDocumentoService} from "../../_services/modelo-documento.service";

@Component({
  selector: 'app-list-modelo-documento',
  templateUrl: './list-modelo-documento.component.html',
  styleUrls: ['./list-modelo-documento.component.scss']
})
export class ListModeloDocumentoComponent implements OnInit {

  public modelos = [];

  constructor(private modeloDocumentoService: ModeloDocumentoService) { }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.modeloDocumentoService.list()
      .subscribe(data => {
        this.modelos = data;
      }, error => {

      });
  }

}
