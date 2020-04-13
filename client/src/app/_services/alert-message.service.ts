import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;
  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true

  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  public success(message: string) {
    this.subject.next( {
      type: 'success',
      text: message,
      dismissible: true,
      timeout: 5000
    });
  }

  public error(message: string) {
    this.subject.next( {
      type: 'danger',
      text: message,
      dismissible: true,
      timeout: 5000
    });
  }
}
