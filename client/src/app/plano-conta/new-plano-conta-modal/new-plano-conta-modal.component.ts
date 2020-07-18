import { Component, OnInit } from '@angular/core';
import { PlanoConta } from 'src/app/_models/plano-conta.model';
import { NgForm } from '@angular/forms';
import { PlanoContaService } from 'src/app/_services/plano-conta.service';
import { AlertMessageService } from 'src/app/_services/alert-message.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-new-plano-conta-modal',
  templateUrl: './new-plano-conta-modal.component.html',
  styleUrls: ['./new-plano-conta-modal.component.scss']
})
export class NewPlanoContaModalComponent implements OnInit {

  planoConta: PlanoConta;
  public loading;
  public id;
  constructor(private planoContaService: PlanoContaService,
              private alertMessageService: AlertMessageService,
              private modalRef: BsModalRef) { }

  ngOnInit() {
    this.planoConta = new PlanoConta();
    if (this.id) {
      this.buscar();
    }
  }

  buscar() {
    this.loading = true;
    this.planoContaService.getById(this.id)
      .subscribe(response => {
        this.planoConta = response;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }
  onSubmit(form: NgForm) {
    this.loading = true;
    this.planoContaService.save(form.value)
      .subscribe(response => {
        this.alertMessageService.success(response.message);
        this.loading = false;
      }, error => {
        this.alertMessageService.error(error.message);
        this.loading = false;
      });
  }

}
