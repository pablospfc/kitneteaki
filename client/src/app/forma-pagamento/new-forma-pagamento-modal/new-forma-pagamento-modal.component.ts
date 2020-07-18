import { Component, OnInit, Input } from '@angular/core';
import { FormaPagamento } from 'src/app/_models/forma-pagamento.model';
import { FormaPagamentoService } from 'src/app/_services/forma-pagamento.service';
import { BsModalRef } from 'ngx-bootstrap';
import { AlertMessageService } from 'src/app/_services/alert-message.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-forma-pagamento-modal',
  templateUrl: './new-forma-pagamento-modal.component.html',
  styleUrls: ['./new-forma-pagamento-modal.component.scss']
})
export class NewFormaPagamentoModalComponent implements OnInit {

  @Input() id: number;
  public loading: boolean;
  formaPagamento: FormaPagamento;
  constructor(private formaPagamentoService: FormaPagamentoService,
              private alertMessageService: AlertMessageService,
              public modalRef: BsModalRef) { }

  ngOnInit() {
    this.formaPagamento = new FormaPagamento();
    if (this.id) {
      this.buscar();
    }
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    this.formaPagamentoService.save(form.value)
      .subscribe(response => {
        this.alertMessageService.success(response.message);
        this.loading = false;
      }, error => {
        this.alertMessageService.error(error.message);
        this.loading = false;
      });
  }

  buscar() {
    this.loading = true;
    this.formaPagamentoService.getById(this.id)
      .subscribe(response => {
        this.formaPagamento = response;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

}
