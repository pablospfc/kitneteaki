import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import {AlertMessageService} from '../_services/alert-message.service';
@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  alerts: any[] = [];
  constructor(private alertService: AlertMessageService) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        this.alerts.push(message);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
