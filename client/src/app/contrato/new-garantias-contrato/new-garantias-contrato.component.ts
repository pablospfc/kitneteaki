import {Component, OnInit, TemplateRef} from '@angular/core';
import {OcupanteImovel} from '../../_models/ocupante_imovel.model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NgForm} from '@angular/forms';
import {OcupanteImovelService} from '../../_services/ocupante-imovel.service';
import {AlertMessageService} from '../../_services/alert-message.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {TestemunhaContratoService} from '../../_services/testemunha-contrato.service';
import {TestemunhaContrato} from '../../_models/testemunha-contrato';
import {FiadorService} from "../../_services/fiador.service";
import {FiadorContrato} from "../../_models/fiador-contrato.model";
import {PessoaService} from "../../_services/pessoa.service";

@Component({
  selector: 'app-new-garantias-contrato',
  templateUrl: './new-garantias-contrato.component.html',
  styleUrls: ['./new-garantias-contrato.component.scss']
})
export class NewGarantiasContratoComponent implements OnInit {

  public ocupantes = [];
  public testemunhas = [];
  public fiadores = [];
  public fiadoresSelectBox = [];
  ocupante: OcupanteImovel;
  testemunha: TestemunhaContrato;
  fiador: FiadorContrato;
  modalRef: BsModalRef;
  public idContrato;
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
    this.ocupante = new OcupanteImovel();
    this.testemunha = new TestemunhaContrato();
    this.fiador = new FiadorContrato();
    this.getOcupantes();
    this.getTestemunhas();
    this.getFiadoresSelectBox();
    this.getFiadores();
  }

  addOcupante(form: NgForm) {
    this.loading = true;
    form.value.id_contrato = this.idContrato;
    this.ocupanteService.save(form.value)
     .subscribe(success => {
       const message = success.message;
       this.alertService.success(message, true);
       this.loading = false;
     },
       error => {
         const message = error.message;
         this.alertService.error(message);
         this.loading = false;
       }
     );
  }

  addTestemunha(form: NgForm) {
    this.loading = true;
    form.value.id_contrato = this.idContrato;
    this.testemunhaService.save(form.value)
      .subscribe(success => {
          const message = success.message;
          this.alertService.success(message, true);
          this.loading = false;
        },
        error => {
          const message = error.message;
          this.alertService.error(message);
          this.loading = false;
        }
      );
  }

  addFiador(form: NgForm) {
    this.loading = true;
    form.value.id_contrato = this.idContrato;
    this.fiadorService.save(form.value)
      .subscribe(success => {
          const message = success.message;
          this.alertService.success(message, true);
          this.loading = false;
        },
        error => {
          const message = error.message;
          this.alertService.error(message);
          this.loading = false;
        }
      );
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
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  getFiadoresSelectBox() {
    this.pessoaService.getFiadores()
      .subscribe(data => {
        this.fiadoresSelectBox = data;
      }, error => {
      });
  }

  getTestemunhas() {
    this.loading = true;
    this.testemunhaService.getByContrato(this.idContrato)
      .subscribe(data => {
        this.testemunhas = data;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  openModalOcupantes(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

    this.modalService.onHide.subscribe((reason: string) => {
      this.getOcupantes();
    });
  }

  openModalTestemunhas(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

    this.modalService.onHide.subscribe((reason: string) => {
      this.getTestemunhas();
    });
  }

}
