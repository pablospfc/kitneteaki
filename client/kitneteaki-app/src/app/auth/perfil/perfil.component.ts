import { Component, OnInit } from '@angular/core';
import {Login} from "../../_models/login.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  login: Login;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>(`${environment.API}/auth/me`).subscribe(data => {
      this.login = data.user;
    });
  }

}
