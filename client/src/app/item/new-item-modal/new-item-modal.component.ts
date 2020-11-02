import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Item} from '../../_models/item.model';
import {AlertMessageService} from '../../_services/alert-message.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ItemService} from '../../_services/item.service';
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-new-item-modal',
  templateUrl: './new-item-modal.component.html',
  styleUrls: ['./new-item-modal.component.scss']
})
export class NewItemModalComponent implements OnInit {
  @Input() id: number;
  public loading: boolean;
  public item: Item;

  constructor(private itemService: ItemService,
              private alertMessageService: AlertMessageService,
              private authService: AuthService,
              public modalRef: BsModalRef) { }

  ngOnInit() {
    this.item = new Item();
    if (this.id) {
      this.buscar();
    }
  }

  buscar() {
    this.loading = true;
    this.itemService.getById(this.id)
      .subscribe(response => {
        this.item = response;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }
  onSubmit(form: NgForm) {
    this.loading = true;
    form.value.token = this.authService.getUser().token;
    this.itemService.save(form.value)
      .subscribe(response => {
        this.alertMessageService.success(response.message);
        this.loading = false;
      }, error => {
        this.alertMessageService.error(error.message);
        this.loading = false;
      });
  }
}
