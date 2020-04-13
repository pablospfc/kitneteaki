import {Component, Input, OnInit} from '@angular/core';
import {OcupanteImovel} from '../../_models/ocupante_imovel.model';
import {OcupanteImovelService} from '../../_services/ocupante-imovel.service';
import {ActivatedRoute, Params} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AlertMessageService} from '../../_services/alert-message.service';
import {BsModalRef} from "ngx-bootstrap";

@Component({
  selector: 'app-ocupantes-imovel-modal',
  templateUrl: './ocupantes-imovel-modal.component.html',
  styleUrls: ['./ocupantes-imovel-modal.component.scss']
})
export class OcupantesImovelModalComponent implements OnInit {

  @Input() id: number;
  @Input() idContrato: number;
  ocupante: OcupanteImovel;
  public loading = false;

  constructor(private ocupanteService: OcupanteImovelService,
              private alertService: AlertMessageService,
              private modalRef: BsModalRef) {
  }

  ngOnInit() {
    this.ocupante = new OcupanteImovel();
    if (this.id) {
      this.buscar(this.id);
    }
  }

  buscar(id: number) {
    this.loading = true;
    this.ocupanteService.getById(id)
      .subscribe(data => {
        this.ocupante = data;
        this.loading = false;
      });
  }

  addOcupante(form: NgForm) {
    this.loading = true;
    form.value.id_contrato = this.idContrato;
    this.ocupanteService.save(form.value)
      .subscribe(success => {
          const message = success.message;
          this.alertService.success(message);
          this.loading = false;
        },
        error => {
          const message = error.message;
          this.alertService.error(message);
          this.loading = false;
        }
      );
  }

}
