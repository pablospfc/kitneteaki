import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {NgForm} from "@angular/forms";
import {Usuario} from "../../_models/usuario.model";
import {UsuarioService} from "../../_services/usuario.service";
import {AlertMessageService} from "../../_services/alert-message.service";

@Component({
  selector: 'app-update-usuario-modal',
  templateUrl: './update-usuario-modal.component.html',
  styleUrls: ['./update-usuario-modal.component.scss']
})
export class UpdateUsuarioModalComponent implements OnInit {

  @Input() id: number;
  usuario: Usuario;
  perfis = [];
  public loading;
  constructor(private modalRef: BsModalRef,
              private alertService: AlertMessageService,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = new Usuario();
    if (this.id) {
      this.getById(this.id);
    }
  }

  onSubmit(form: NgForm) {
   this.usuarioService.atualizar(form.value)
     .subscribe(response => {
       this.alertService.success(response.message);
     }, error => {
       this.alertService.error(error.message);
     });
  }

  getById(id) {
    this.usuarioService.getById(id)
      .subscribe(response => {
        this.usuario = response;
      }, error => {

      });
  }

}
