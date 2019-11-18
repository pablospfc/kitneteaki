import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {AuthService} from '../_services/auth.service';
import { PerfilComponent } from './perfil/perfil.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [LoginComponent, PerfilComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [AuthService]
})
export class AuthModule { }


