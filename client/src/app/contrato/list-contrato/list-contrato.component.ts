import {Component, OnInit, TemplateRef} from '@angular/core';
import {ContratoService} from '../../_services/contrato.service';
import {AlertMessageService} from "../../_services/alert-message.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ImovelService} from "../../_services/imovel.service";
import {PessoaService} from "../../_services/pessoa.service";

@Component({
  selector: 'app-list-contrato',
  templateUrl: './list-contrato.component.html',
  styleUrls: ['./list-contrato.component.scss']
})
export class ListContratoComponent implements OnInit {

  contratos = [];
  public loading = false;
  public totalRec;
  public page = 1;
  public id;
  public filter = false;
  public imoveis = [];
  public inquilinos = [];
  public filtro = {
   id_locatario: null,
   id_tipo_contrato: null,
   id_status: null,
   vigencia_inicial: null,
   vigencia_final: null,
   valor_inicial: null,
   valor_final: null,
   id_imovel: null,
  };
  modalRef: BsModalRef;

  constructor(private contratoService: ContratoService,
              private imovelService: ImovelService,
              private pessoaService: PessoaService,
              private modalService: BsModalService,
              private alertMessageService: AlertMessageService) {
  }

  ngOnInit() {
    this.getAll();
    this.getImoveis();
    this.getInquilinos();
  }

  openModalConfirmRemove(template: TemplateRef<any>, id: number) {
    this.id = id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm',
      initialState: {
        id: id
      }
    });
  }

  confirmRemove() {
    this.loading = true;
    this.contratoService.delete(this.id)
      .subscribe(data => {
        this.alertMessageService.success(data.message);
        this.loading = false;
      }, error => {
        this.alertMessageService.error(error.message);
        this.loading = false;
      });

    this.modalRef.hide();
    this.getAll();
  }

  decline(): void {
    this.modalRef.hide();
  }

  getAll() {
    this.loading = true;
    return this.contratoService.list(this.filtro)
      .subscribe(success => {
        this.contratos = success;
        this.loading = false;
        this.totalRec = this.contratos.length;
        this.page = 1;
      }, error => {
        console.log(error);
        this.alertMessageService.error(error.message);
        this.loading = false;
      });
  }

  clear() {
    this.filtro = {
      id_locatario: null,
      id_tipo_contrato: null,
      id_status: null,
      vigencia_inicial: null,
      vigencia_final: null,
      valor_inicial: null,
      valor_final: null,
      id_imovel: null,
    };
  }

  getImoveis() {
    this.imovelService.list()
      .subscribe(data => {
        this.imoveis = data;
      }, error => {

      });
  }

  getInquilinos() {
    this.pessoaService.getInquilinos()
      .subscribe(data => {
        this.inquilinos = data;
      }, error => {

      });
  }

  openFilter() {
    if (this.filter === true) {
      this.filter = false;
    } else {
      this.filter = true;
    }
  }

}
