import { Component, OnInit } from '@angular/core';
import {Contrato} from '../../_models/contrato.model';
import {NgForm} from '@angular/forms';
import {ContratoService} from '../../_services/contrato.service';
import {AlertService} from '../../_services/alert.service';
import {Router} from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-new-contrato',
  templateUrl: './new-contrato.component.html',
  styleUrls: ['./new-contrato.component.scss'],
  providers: [DatePipe]
})
export class NewContratoComponent implements OnInit {

  contrato: Contrato;
  constructor(private contratoService: ContratoService,
              private alertService: AlertService,
              private router: Router,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.contrato = new Contrato();
  }

  onSubmit(form: NgForm) {
    return this.contratoService.save(form.value)
      .subscribe(success => {
        const message = (success as any).message;
        this.alertService.success(message, true);
        //this.router.navigate(['new-ocupantes-imovel']);
      }, error => {
        const message = (error as any).message;
        this.alertService.error(message);
      });
  }

  calcularFimContrato(data: Date, vigencia: number): Date {
    const date = new Date(data);
    let dataStr: string;
    date.setMonth(date.getMonth() + vigencia);
    dataStr = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log('Data: ' + dataStr);
    this.contrato.data_fim = date;
    return date;
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
