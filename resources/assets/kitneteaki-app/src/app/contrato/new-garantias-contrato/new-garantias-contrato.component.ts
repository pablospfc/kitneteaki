import {Component, OnInit, TemplateRef} from '@angular/core';
import {OcupanteImovel} from '../../_models/ocupante_imovel.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NgForm} from '@angular/forms';
import {OcupanteImovelService} from '../../_services/ocupante-imovel.service';
import {AlertService} from '../../_services/alert.service';

@Component({
  selector: 'app-new-garantias-contrato',
  templateUrl: './new-garantias-contrato.component.html',
  styleUrls: ['./new-garantias-contrato.component.scss']
})
export class NewGarantiasContratoComponent implements OnInit {

  ocupantes: OcupanteImovel[];
  ocupante: OcupanteImovel;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService,
              private alertService: AlertService,
              private ocupanteService: OcupanteImovelService) { }

  ngOnInit() {
    this.ocupante = new OcupanteImovel();
    this.ocupantes = [];
  }

  addOcupante(form: NgForm) {
    console.log(form.value);
    console.log('chegou aqui');
    /*this.ocupanteService.save(form.value)
     .subscribe(success => {
       const message = (success as any).message;
       this.alertService.success(message, true);
     },
       error => {
         const message = (error as any).message;
         this.alertService.error(message);
       }
     );
     */
  }

  openModalOcupantes(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
