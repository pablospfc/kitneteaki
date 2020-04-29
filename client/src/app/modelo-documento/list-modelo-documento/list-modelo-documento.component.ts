import { Component, OnInit } from '@angular/core';
import {ModeloDocumentoService} from "../../_services/modelo-documento.service";

@Component({
  selector: 'app-list-modelo-documento',
  templateUrl: './list-modelo-documento.component.html',
  styleUrls: ['./list-modelo-documento.component.scss']
})
export class ListModeloDocumentoComponent implements OnInit {

  public modelos = [];
  public loading;
  public page = 1;
  public totalRec;
  constructor(private modeloDocumentoService: ModeloDocumentoService) { }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.loading = true;
    this.modeloDocumentoService.list()
      .subscribe(data => {
        this.modelos = data;
        this.totalRec = this.modelos.length;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

}
