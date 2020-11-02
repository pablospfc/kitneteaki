import {Component, Input, OnInit} from '@angular/core';
import {TipoImovel} from '../../_models/tipo-imovel.model';
import {NgForm} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {TipoImovelService} from '../../_services/tipo-imovel.service';
import {AlertMessageService} from '../../_services/alert-message.service';

@Component({
  selector: 'app-new-tipo-imovel-modal',
  templateUrl: './new-tipo-imovel-modal.component.html',
  styleUrls: ['./new-tipo-imovel-modal.component.scss']
})
export class NewTipoImovelModalComponent implements OnInit {
  @Input() id: number;
  tipoImovel: TipoImovel;
  public loading;
  constructor(private tipoImovelService: TipoImovelService,
              private alertMessageService: AlertMessageService,
              public modalRef: BsModalRef) { }

  ngOnInit() {
    this.tipoImovel = new TipoImovel();
    if (this.id) {
      this.buscar();
    }
  }

  buscar() {
    this.loading = true;
    this.tipoImovelService.getById(this.id)
      .subscribe(response => {
        this.tipoImovel = response;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }
  onSubmit(form: NgForm) {
    this.loading = true;
    this.tipoImovelService.save(form.value)
      .subscribe(response => {
        this.alertMessageService.success(response.message);
        this.loading = false;
      }, error => {
        this.alertMessageService.error(error.message);
        this.loading = false;
      });
  }

}
