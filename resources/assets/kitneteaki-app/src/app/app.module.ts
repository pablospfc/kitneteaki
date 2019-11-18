import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { MenuComponent } from './layout/menu/menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardTemplateComponent } from './templates/dashboard-template/dashboard-template.component';
import { LoginTemplateComponent } from './templates/login-template/login-template.component';
import { HomeComponent } from './home/home/home.component';
import { ListPessoaComponent } from './pessoa/list-pessoa/list-pessoa.component';
import { HomeModule } from './home/home.module';
import { ContratoModule } from './contrato/contrato.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { ImovelModule } from './imovel/imovel.module';
import { LayoutModule } from './layout/layout.module';
import { ListContaComponent } from './conta/list-conta/list-conta.component';
import { ListImovelComponent } from './imovel/list-imovel/list-imovel.component';
import { ListContratoComponent } from './contrato/list-contrato/list-contrato.component';
import { LoginComponent } from './auth/login/login.component';
import {NewPessoaComponent} from './pessoa/new-pessoa/new-pessoa.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AlertComponent } from './alert/alert.component';
import {NewImovelComponent} from './imovel/new-imovel/new-imovel.component';
import {NewModeloDocumentoComponent} from './modelo-documento/new-modelo-documento/new-modelo-documento.component';
import {ListModeloDocumentoComponent} from './modelo-documento/list-modelo-documento/list-modelo-documento.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NewContratoComponent} from './contrato/new-contrato/new-contrato.component';
import {DatePipe} from '@angular/common';
import {NewGarantiasContratoComponent} from './contrato/new-garantias-contrato/new-garantias-contrato.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import {AuthGuard} from './_guards/auth.guard';
import {TokenInterceptor} from './_interceptors/token.interceptor';
import {PerfilComponent} from './auth/perfil/perfil.component';
import {RefreshTokenInterceptor} from "./_interceptors/refresh-token.interceptor";
import {AplicationErrorHandle} from "./app.error-handle";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListContaComponent,
    ListImovelComponent,
    ListContratoComponent,
    ListPessoaComponent,
    NewPessoaComponent,
    NewImovelComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    DashboardTemplateComponent,
    LoginTemplateComponent,
    NewModeloDocumentoComponent,
    ListModeloDocumentoComponent,
    NewContratoComponent,
    NewGarantiasContratoComponent,
    PerfilComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CKEditorModule,
    ModalModule.forRoot()
  ],
  providers: [DatePipe, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true
    },
    {
      provide: ErrorHandler, useClass: AplicationErrorHandle
    }
    ],
  exports: [
    AlertComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
