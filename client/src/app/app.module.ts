import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardTemplateComponent } from './templates/dashboard-template/dashboard-template.component';
import { LoginTemplateComponent } from './templates/login-template/login-template.component';
import { HomeModule } from './home/home.module';
import { ContratoModule } from './contrato/contrato.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { ImovelModule } from './imovel/imovel.module';
import { LayoutModule } from './layout/layout.module';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {DatePipe} from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import {AuthGuard} from './_guards/auth.guard';
import {TokenInterceptor} from './_interceptors/token.interceptor';
import {RefreshTokenInterceptor} from './_interceptors/refresh-token.interceptor';
import {AplicationErrorHandle} from './app.error-handle';
import {AuthModule} from './auth/auth.module';
import {ContaModule} from './conta/conta.module';
import {ModeloDocumentoModule} from './modelo-documento/modelo-documento.module';
import {RelatorioModule} from './relatorio/relatorio.module';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from 'ngx-loading';
import {NgxPaginationModule} from 'ngx-pagination';
import {AlertModule} from 'ngx-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    DashboardTemplateComponent,
    LoginTemplateComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CKEditorModule,
    LayoutModule,
    AuthModule,
    ContaModule,
    HomeModule,
    ContratoModule,
    ImovelModule,
    ModeloDocumentoModule,
    PessoaModule,
    RelatorioModule,
    NgxPaginationModule,
    AlertModule.forRoot(),
    NgxLoadingModule.forRoot({animationType: ngxLoadingAnimationTypes.circle,
      backdropBorderRadius: '4px',
      primaryColour: '#00a65a',
      secondaryColour: '#0e7fe1'
    }),
    ModalModule.forRoot()
  ],
  providers: [ AuthGuard,
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

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
