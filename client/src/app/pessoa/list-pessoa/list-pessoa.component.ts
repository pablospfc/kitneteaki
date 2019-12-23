import { Component, OnInit } from '@angular/core';
import {PessoaService} from "../../_services/pessoa.service";
import {Pessoa} from "../../_models/pessoa.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list-pessoa',
  templateUrl: './list-pessoa.component.html',
  styleUrls: ['./list-pessoa.component.scss']
})
export class ListPessoaComponent implements OnInit {

   public pessoas = [];
   public pessoa = Pessoa;
   public loading = false;
   public page = 1;
   public totalRec: number;
  constructor(private pessoaService: PessoaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.loading = true;
    this.pessoaService.list()
      .subscribe(response => {
       // console.log(response);
        this.pessoas = response;
        this.loading = false;
        this.totalRec = this.pessoas.length;
      });
  }

  openEditPessoa(id: number) {
    this.router.navigate(['update-pessoa', id], { relativeTo: this.route });
  }

}
