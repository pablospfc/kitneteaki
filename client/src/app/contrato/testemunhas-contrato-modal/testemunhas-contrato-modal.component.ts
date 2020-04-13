import {Component, Input, OnInit} from '@angular/core';
import {TestemunhaContrato} from "../../_models/testemunha-contrato";
import {NgForm} from "@angular/forms";
import {TestemunhaContratoService} from "../../_services/testemunha-contrato.service";
import {AlertMessageService} from "../../_services/alert-message.service";
import {BsModalRef} from "ngx-bootstrap";

@Component({
  selector: 'app-testemunhas-contrato-modal',
  templateUrl: './testemunhas-contrato-modal.component.html',
  styleUrls: ['./testemunhas-contrato-modal.component.scss']
})
export class TestemunhasContratoModalComponent implements OnInit {

  @Input() id: number;
  @Input() idContrato: number;
  testemunha: TestemunhaContrato;
  public loading;
  constructor(private testemunhaService: TestemunhaContratoService,
              private alertService: AlertMessageService,
              private modalRef: BsModalRef) { }

  ngOnInit() {
    this.testemunha = new TestemunhaContrato();
    if (this.id) {
      this.buscar(this.id);
    }
  }

  buscar(id: number) {
    this.testemunhaService.getById(id)
      .subscribe(data => {
        this.testemunha = data;
      });
  }

  addTestemunha(form: NgForm) {
    this.loading = true;
    form.value.id_contrato = this.idContrato;
    this.testemunhaService.save(form.value)
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
