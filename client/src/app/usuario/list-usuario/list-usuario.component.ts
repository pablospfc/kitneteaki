import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../_services/usuario.service";
import {AlertMessageService} from "../../_services/alert-message.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {UpdateUsuarioModalComponent} from "../update-usuario-modal/update-usuario-modal.component";

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.scss']
})
export class ListUsuarioComponent implements OnInit {

  public usuarios = [];
  public page = 1;
  public totalRec;
  public loading: boolean;
  modalRef: BsModalRef;
  constructor(private usuarioService: UsuarioService,
              private alertService: AlertMessageService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.usuarioService.list()
      .subscribe(data => {
        this.usuarios = data;
      }, error => {

      });
  }

  openModalAtualizacao(id) {
   this.modalRef = this.modalService.show(UpdateUsuarioModalComponent, {
     initialState: {
       id: id,
     }
   });

   this.modalService.onHide.subscribe((reason: string) => {
      this.list();
    });
  }

  atualizar(usuario) {
    this.usuarioService.atualizar(usuario)
      .subscribe(response => {
        this.alertService.success(response.message);
      }, error => {
        this.alertService.error(error.message);
      });
  }

}
