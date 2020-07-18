import { Component, OnInit } from '@angular/core';
import { OcorrenciaService } from 'src/app/_services/ocorrencia.service';

@Component({
  selector: 'app-list-ocorrencia',
  templateUrl: './list-ocorrencia.component.html',
  styleUrls: ['./list-ocorrencia.component.scss']
})
export class ListOcorrenciaComponent implements OnInit {

  public ocorrencias = [];
  public page = 1;
  public totalRec;
  public loading;
  public filter = false;
  public tiposOcorrencias = [];
  public filtro = {
    iid: null,
    id_tipo_ocorrencia: null,
    data_inicial: null,
    data_final: null,
    hora_inicial: null,
    hora_final: null,
    descricao: null
  }
  constructor(private ocorrenciaService: OcorrenciaService) { }

  ngOnInit() {
  }

  list() {
    this.loading = true;
   this.ocorrenciaService.list()
   .subscribe(data => {
     this.ocorrencias = data;
     this.loading = false;
   }, error => {
     this.loading = false;
   })
  }

  openFilter() {
    if (this.filter === true) {
      this.filter = false;
    } else {
      this.filter = true;
    }
  }

}
