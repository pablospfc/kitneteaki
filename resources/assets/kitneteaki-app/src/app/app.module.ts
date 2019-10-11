import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import {NewPessoaComponent} from "./pessoa/new-pessoa/new-pessoa.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AlertComponent } from './alert/alert.component';
import {NewImovelComponent} from "./imovel/new-imovel/new-imovel.component";

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
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  exports: [
    AlertComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
