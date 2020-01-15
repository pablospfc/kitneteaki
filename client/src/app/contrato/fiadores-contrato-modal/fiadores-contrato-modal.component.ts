import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {FiadorService} from '../../_services/fiador.service';
import {AlertMessageService} from '../../_services/alert-message.service';
import {BsModalRef} from 'ngx-bootstrap';
import {FiadorContrato} from '../../_models/fiador-contrato.model';
import {PessoaService} from '../../_services/pessoa.service';

@Component({
  selector: 'app-fiadores-contrato-modal',
  templateUrl: './fiadores-contrato-modal.component.html',
  styleUrls: ['./fiadores-contrato-modal.component.scss']
})
export class FiadoresContratoModalComponent implements OnInit {

  @Input() id: number;
  @Input() idContrato: number;
  public loading = false;
  public fiadores = [];
  fiador: FiadorContrato;

  constructor(private fiadorService: FiadorService,
              private alertService: AlertMessageService,
              private pessoaService: PessoaService,
              private modalRef: BsModalRef) {
  }

  ngOnInit() {
    this.fiador = new FiadorContrato();
    this.getFiadores();
    if (this.id) {
      this.buscar(this.id);
    }
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

  buscar(id: number) {
    this.loading = true;
    this.fiadorService.getById(id)
      .subscribe(data => {
        this.fiador = data;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  getFiadores() {
    this.pessoaService.getFiadores()
      .subscribe(data => {
        this.fiadores = data;
      }, error => {
      });
  }

}
