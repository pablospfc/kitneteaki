import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {Login} from '../_models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  private readonly API = `${environment.API}/auth`;

  public login(credentials: { login: string, password: string }) {
    return this.http.post<any>(`${this.API}/login`, credentials)
      .pipe(
        map(data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', btoa(JSON.stringify(data.user)));
          return data;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  public check(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  public logout() {
    return this.http.get(`${this.API}/logout`)
      .subscribe( resp => {
        localStorage.clear();
        this.router.navigate(['/login']);
      });

  }

  public getUser(): Login {
    return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
  }

  public setUser() {
    return this.http.get<any>(`${this.API}/me`)
      .toPromise()
      .then(data => {
        if (data) {
          localStorage.setItem('user', btoa(JSON.stringify(data.user)));
          return true;
        }
        return false;
      });

  }
}
