import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ContaService} from "../../_services/conta.service";
import {AlertMessageService} from "../../_services/alert-message.service";
import {ImovelService} from "../../_services/imovel.service";
import {CategoriaContaService} from "../../_services/categoria-conta.service";

@Component({
  selector: 'app-list-conta',
  templateUrl: './list-conta.component.html',
  styleUrls: ['./list-conta.component.scss']
})
export class ListContaComponent implements OnInit {

  public loading = false;
  public id;
  public contas = [];
  public imoveis = [];
  public categorias = [];
  public totalRec;
  public page = 1;
  public filtro = {
    id_tipo_conta: null,
    id_categoria_conta: null,
    id_status: null,
    periodo_inicial: null,
    periodo_final: null,
    valor_inicial: null,
    valor_final: null,
    id_imovel: null,
  };
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
              private alertService: AlertMessageService,
              private imovelService: ImovelService,
              private categoriaContaService: CategoriaContaService,
              private contaService: ContaService) {
  }

  ngOnInit() {
    this.getImoveis();
    this.list();
  }

  decline(): void {
    this.modalRef.hide();
  }

  list() {
    this.loading = true;
    this.contaService.list(this.filtro)
      .subscribe(data => {
        this.contas = data;
        this.loading = false;
        this.page = 1;
        this.totalRec = this.contas.length;
      }, error => {
        this.alertService.error(error.message);
        this.loading = false;
      });
  }

  getImoveis() {
   return this.imovelService.list()
     .subscribe(data => {
       this.imoveis = data;
     }, error => {

     });
  }

  clear() {
    this.filtro = {
      id_tipo_conta: null,
      id_categoria_conta: null,
      id_status: null,
      periodo_inicial: null,
      periodo_final: null,
      valor_inicial: null,
      valor_final: null,
      id_imovel: null,
    };
  }

  getCategoriasConta(idTipoConta: number) {
    this.categoriaContaService.getByTipoConta(idTipoConta)
      .subscribe(data => {
        this.categorias = data;
      }, error => {

      });
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
    this.contaService.remove(this.id)
      .subscribe(data => {
        this.alertService.success(data.message);
        this.loading = false;
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      });
    this.decline();
    this.list();
  }

}
