import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import $ from 'jquery';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    let $: JQueryStatic = (window as any)["jQuery"];
    $(document).ready(() => {
      const trees: any = $('[data-widget="tree"]');
      trees.tree();
    });
  }

}
