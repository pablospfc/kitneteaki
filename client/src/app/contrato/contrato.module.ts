import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContratoComponent } from './list-contrato/list-contrato.component';
import { NewContratoComponent } from './new-contrato/new-contrato.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AppModule} from '../app.module';
import { NewGarantiasContratoComponent } from './new-garantias-contrato/new-garantias-contrato.component';
import {AuthModule} from '../auth/auth.module';
import {NgxLoadingModule} from 'ngx-loading';
import {NgxPaginationModule} from 'ngx-pagination';
import { FinalizacaoContratoComponent } from './finalizacao-contrato/finalizacao-contrato.component';
import { OcupantesImovelModalComponent } from './ocupantes-imovel-modal/ocupantes-imovel-modal.component';
import { TestemunhasContratoModalComponent } from './testemunhas-contrato-modal/testemunhas-contrato-modal.component';
import { FiadoresContratoModalComponent } from './fiadores-contrato-modal/fiadores-contrato-modal.component';
import { ItensContratoModalComponent } from './itens-contrato-modal/itens-contrato-modal.component';
import { ParcelasContratoModalComponent } from './parcelas-contrato-modal/parcelas-contrato-modal.component';
import { GeracaoParcelasModalComponent } from './geracao-parcelas-modal/geracao-parcelas-modal.component';
import { RenovacaoContratoComponent } from './renovacao-contrato/renovacao-contrato.component';
import { DocumentoContratoModalComponent } from './documento-contrato-modal/documento-contrato-modal.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

@NgModule({
  declarations: [ListContratoComponent, NewContratoComponent, NewGarantiasContratoComponent, FinalizacaoContratoComponent, OcupantesImovelModalComponent, TestemunhasContratoModalComponent, FiadoresContratoModalComponent, ItensContratoModalComponent, ParcelasContratoModalComponent, GeracaoParcelasModalComponent, RenovacaoContratoComponent, DocumentoContratoModalComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        AuthModule,
        NgxLoadingModule,
        NgxPaginationModule,
        CKEditorModule,
    ]
})
export class ContratoModule { }
