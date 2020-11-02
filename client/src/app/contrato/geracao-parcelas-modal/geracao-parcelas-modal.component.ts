import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {AlertMessageService} from '../../_services/alert-message.service';
import {ParcelaService} from '../../_services/parcela.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-geracao-parcelas-modal',
  templateUrl: './geracao-parcelas-modal.component.html',
  styleUrls: ['./geracao-parcelas-modal.component.scss']
})
export class GeracaoParcelasModalComponent implements OnInit {

  @Input() idContrato: number;
  public loading: boolean;
  parcelas = [];
  constructor(private modalService: BsModalService,
              private parcelaService: ParcelaService,
              private alertService: AlertMessageService,
              private router: Router,
              public modalRef: BsModalRef) { }

  ngOnInit() {
    this.mostrarParcelas();
  }

  mostrarParcelas() {
    this.loading = true;
    this.parcelaService.getParcelas(this.idContrato)
      .subscribe(data => {
        this.parcelas = data;
        this.loading = false;
      }, error => {
        this.alertService.error(error.message);
        this.loading = false;
      });
  }

  gerarParcelas() {
    this.loading = true;
    this.parcelaService.gerarParcelas(this.idContrato)
      .subscribe(data => {
        this.alertService.success(data.message);
        this.loading = false;
        window.scroll(0,0);
      }, error => {
        this.alertService.error(error.message);
        this.loading = false;
      });
  }

}
