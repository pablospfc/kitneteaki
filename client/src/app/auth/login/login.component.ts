import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../_services/auth.service';
import {Login} from '../../_models/login.model';
import {Router} from "@angular/router";
import {AlertMessageService} from '../../_services/alert-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login;
  constructor(private authService: AuthService,
              private router: Router,
              private alertService: AlertMessageService,
              ) { }

  ngOnInit() {
   this.login = new Login();
  }

  onSubmit(form: NgForm) {
   return this.authService.login(form.value)
     .subscribe((resp) => {
       this.router.navigate(['home']);
     }, (error) => {
       this.alertService.error(error);
     });
  }

}
