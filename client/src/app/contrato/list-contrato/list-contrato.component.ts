import {Component, OnInit} from '@angular/core';
import {ContratoService} from '../../_services/contrato.service';
import {AlertMessageService} from "../../_services/alert-message.service";

@Component({
  selector: 'app-list-contrato',
  templateUrl: './list-contrato.component.html',
  styleUrls: ['./list-contrato.component.scss']
})
export class ListContratoComponent implements OnInit {

  contratos = [];
  public loading = false;
  public totalRec;
  public page = 1;
  constructor(private contratoService: ContratoService,
              private alertMessageService: AlertMessageService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    return this.contratoService.list()
      .subscribe(success => {
        this.contratos = success;
        this.loading = false;
        this.totalRec = this.contratos.length;
      }, error => {
        console.log(error);
        this.alertMessageService.error(error.message);
        this.loading = false;
      });
  }

}
