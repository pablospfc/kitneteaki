import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {OcupanteImovelService} from '../../_services/ocupante-imovel.service';
import {AlertMessageService} from '../../_services/alert-message.service';
import {ActivatedRoute, Params} from '@angular/router';
import {TestemunhaContratoService} from '../../_services/testemunha-contrato.service';
import {TestemunhaContrato} from '../../_models/testemunha-contrato';
import {FiadorService} from '../../_services/fiador.service';
import {FiadorContrato} from '../../_models/fiador-contrato.model';
import {PessoaService} from '../../_services/pessoa.service';
import {OcupantesImovelModalComponent} from '../ocupantes-imovel-modal/ocupantes-imovel-modal.component';
import {TestemunhasContratoModalComponent} from '../testemunhas-contrato-modal/testemunhas-contrato-modal.component';
import {FiadoresContratoModalComponent} from '../fiadores-contrato-modal/fiadores-contrato-modal.component';

@Component({
  selector: 'app-new-garantias-contrato',
  templateUrl: './new-garantias-contrato.component.html',
  styleUrls: ['./new-garantias-contrato.component.scss']
})
export class NewGarantiasContratoComponent implements OnInit {

  public ocupantes = [];
  public testemunhas = [];
  public fiadores = [];
  testemunha: TestemunhaContrato;
  fiador: FiadorContrato;
  modalRef: BsModalRef;
  public idContrato;
  public id;
  public item;
  public qtdTestemunhas: number;
  public qtdFiadores: number;
  public loading = false;

  constructor(private modalService: BsModalService,
              private alertService: AlertMessageService,
              private ocupanteService: OcupanteImovelService,
              private testemunhaService: TestemunhaContratoService,
              private fiadorService: FiadorService,
              private pessoaService: PessoaService,
              private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.idContrato = params.id;
    });
  }

  ngOnInit() {
    this.testemunha = new TestemunhaContrato();
    this.fiador = new FiadorContrato();
    this.getOcupantes();
    this.getTestemunhas();
    this.getFiadores();
  }

  openModalConfirmRemove(item: string, template: TemplateRef<any>, id: number) {
    this.id = id;
    this.item = item;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm',
      initialState: {
        id: id
      }
    });
  }

  confirmRemove() {
    switch (this.item) {
      case 'ocupante': {
         this.removeOcupante(this.id);
         break;
      }
      case 'fiador': {
        this.removeFiador(this.id);
        break;
      }
      case 'testemunha': {
        this.removeTestemunha(this.id);
        break;
      }
    }
  }

  removeFiador(id) {
    this.loading = true;
    this.fiadorService.delete(id)
      .subscribe(data => {
        this.alertService.success(data.message);
        this.loading = false;
      }, error => {
        this.alertService.error(error.message);
        this.loading = false;
      });
    this.modalRef.hide();
    this.getFiadores();
  }

  decline(): void {
    this.modalRef.hide();
  }

  removeOcupante(id) {
    this.loading = true;
    this.ocupanteService.delete(id)
      .subscribe(data => {
        this.alertService.success(data.message);
        this.loading = false;
      }, error => {
        this.alertService.error(error.message);
        this.loading = false;
      });
    this.modalRef.hide();
    this.getOcupantes();
  }

  removeTestemunha(id: number) {
    this.loading = true;
    this.testemunhaService.delete(id)
      .subscribe(data => {
        this.alertService.success(data.message);
        this.loading = false;
      }, error => {
        this.alertService.error(error.message);
        this.loading = false;
      });
    this.modalRef.hide();
    this.getTestemunhas();
  }

  getOcupantes() {
    this.loading = true;
    this.ocupanteService.getByContrato(this.idContrato)
      .subscribe(data => {
        this.ocupantes = data;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  getFiadores() {
    this.loading = true;
    this.fiadorService.getByContrato(this.idContrato)
      .subscribe(data => {
        this.fiadores = data;
        this.qtdFiadores = this.fiadores.length;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  getTestemunhas() {
    this.loading = true;
    this.testemunhaService.getByContrato(this.idContrato)
      .subscribe(data => {
        this.testemunhas = data;
        this.qtdTestemunhas = this.testemunhas.length;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  openModalOcupantes(id: number = null) {
    this.modalRef = this.modalService.show(OcupantesImovelModalComponent, {
      initialState: {
        id: id,
        idContrato: this.idContrato
      }
    });

    this.modalService.onHide.subscribe((reason: string) => {
      this.getOcupantes();
    });
  }

  openModalTestemunhas(id: number = null) {
    this.modalRef = this.modalService.show(TestemunhasContratoModalComponent, {
      initialState: {
        id: id,
        idContrato: this.idContrato
      }
    });

    this.modalService.onHide.subscribe((reason: string) => {
      this.getTestemunhas();
    });
  }

  openModalFiadores(id: number = null) {
    this.modalRef = this.modalService.show(FiadoresContratoModalComponent, {
      initialState: {
        id: id,
        idContrato: this.idContrato,
      }
    });

    this.modalService.onHide.subscribe((reason: string) => {
      this.getFiadores();
    });
  }

}
