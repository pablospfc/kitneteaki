import { Component, OnInit } from '@angular/core';
import {Contrato} from "../../_models/contrato.model";
import {NgForm} from "@angular/forms";
import {ContratoService} from "../../_services/contrato.service";
import {AlertService} from "../../_services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-contrato',
  templateUrl: './new-contrato.component.html',
  styleUrls: ['./new-contrato.component.scss']
})
export class NewContratoComponent implements OnInit {

  contrato: Contrato;
  constructor(private contratoService: ContratoService, private alertService: AlertService, private router: Router) { }

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

}
