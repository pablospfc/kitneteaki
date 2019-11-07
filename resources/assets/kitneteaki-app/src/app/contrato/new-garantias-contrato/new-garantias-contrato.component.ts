import {Component, OnInit, TemplateRef} from '@angular/core';
import {OcupanteImovel} from '../../_models/ocupante_imovel.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-new-garantias-contrato',
  templateUrl: './new-garantias-contrato.component.html',
  styleUrls: ['./new-garantias-contrato.component.scss']
})
export class NewGarantiasContratoComponent implements OnInit {

  ocupantes: OcupanteImovel[];
  ocupante: OcupanteImovel;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.ocupante = new OcupanteImovel();
    this.ocupantes = [];
  }

  addOcupante(ocupante: OcupanteImovel) {
   this.ocupantes.push(ocupante);
   this.ocupante = new OcupanteImovel();
  }

  openModalOcupantes(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
