import { Component, OnInit } from '@angular/core';
import {Imovel} from '../../_models/imovel.model';
import {NgForm} from '@angular/forms';
import {ImovelService} from '../../_services/imovel.service';
import {AlertService} from "../../_services/alert.service";

@Component({
  selector: 'app-new-imovel',
  templateUrl: './new-imovel.component.html',
  styleUrls: ['./new-imovel.component.scss']
})
export class NewImovelComponent implements OnInit {

  imovel: Imovel;
  constructor(private imovelService: ImovelService, private alertService: AlertService) { }

  ngOnInit() {
    this.imovel = new Imovel();
  }

  onSubmit(form: NgForm) {
    this.imovelService.save(form.value)
      .subscribe(success => {
        const message = (success as any).message;
        this.alertService.success(message, true);
      }, error => {
        const message = (error as any).message;
        this.alertService.error(message);
      });
  }

}
