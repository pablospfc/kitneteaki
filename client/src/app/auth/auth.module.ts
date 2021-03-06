import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {AuthService} from '../_services/auth.service';
import { PerfilComponent } from './perfil/perfil.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AlertMessageComponent} from "../alert-message/alert-message.component";
import {NgxLoadingModule} from "ngx-loading";
import {AlertModule} from "ngx-bootstrap";

@NgModule({
  declarations: [LoginComponent, PerfilComponent, AlertMessageComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgxLoadingModule,
        AlertModule,
    ],
  exports: [
    AlertMessageComponent
  ],
  providers: [AuthService]
})
export class AuthModule { }


