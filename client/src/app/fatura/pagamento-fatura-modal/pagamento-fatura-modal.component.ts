import {Component, Input, OnInit} from '@angular/core';
import {Parcela} from "../../_models/parcela.model";
import {NgForm} from "@angular/forms";
import {ParcelaService} from "../../_services/parcela.service";
import {AlertMessageService} from "../../_services/alert-message.service";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-pagamento-fatura-modal',
  templateUrl: './pagamento-fatura-modal.component.html',
  styleUrls: ['./pagamento-fatura-modal.component.scss']
})
export class PagamentoFaturaModalComponent implements OnInit {
  @Input()  id: number;
  parcela: Parcela;
  public loading;
  constructor(private parcelaService: ParcelaService,
              private modalRef: BsModalRef,
              private alertService: AlertMessageService) { }

  ngOnInit() {
    this.parcela = new Parcela();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.loading = true;
    form.value.id_status = 6;
    form.value.id = this.id;
    this.parcelaService.realizarPagamento(form.value)
      .subscribe(response => {
        this.alertService.success(response.message);
        this.loading = false;
      }, error => {
        this.alertService.error(error.message);
        this.loading = false;
      });
  }

}
