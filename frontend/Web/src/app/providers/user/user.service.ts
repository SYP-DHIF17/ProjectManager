import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@models';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLS, RegisterResponse, LoginResponse } from '@shared';
import { StorageService } from '@providers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: BehaviorSubject<User> = new BehaviorSubject(undefined);
  // public user: User;
  public token: BehaviorSubject<string> = new BehaviorSubject("");
  // public token: string;
  public tokenExpiration: BehaviorSubject<Date> = new BehaviorSubject(undefined);
  // public tokenExpiration: Date;

  constructor(private _http: HttpClient,
    private _router: Router,
    private _storage: StorageService) {
    if (this.isLoggedIn()) {
      this.user.next(JSON.parse(localStorage.getItem("VORTEX.USER.USER")));
      this.token.next(localStorage.getItem("VORTEX.USER.TOKEN"));
      this.tokenExpiration.next(new Date(localStorage.getItem("VORTEX.USER.EXPIRE")));
    }
  }

  public isLoggedIn(): boolean {
    let token = this._storage.get("VORTEX.USER.TOKEN");
    let user = this._storage.get("VORTEX.USER.USER");
    let tokenExpiration = this._storage.get("VORTEX.USER.EXPIRE");

    return !(token || user || tokenExpiration) // should also work
    // return !(token == '' || token == null || user == '' || user == null || tokenExpiration == '' || tokenExpiration == null || (new Date(tokenExpiration) < new Date()));
  }

  public login(username: string, password: string): Observable<LoginResponse> {
    return this._http.post(URLS.USER.LOGIN, {
      username,
      password
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }) as Observable<LoginResponse>;
  }

  public register(firstname: string, lastname: string, email: string, password: string, birthdate: Date): Observable<RegisterResponse> {
    return this._http.post(URLS.USER.REGISTER, {
      firstname,
      lastname,
      password,
      email,
      birthdate
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }) as Observable<RegisterResponse>;
  }

  // public changePassword(password: string): Observable<any> {
  //   return this._http.post(URLS.USER.CHANGE_PASSWORD, {
  //     newPW: password
  //   },
  //     {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json; charset=utf-8',
  //         'Access-Control-Allow-Origin': '*',
  //         'auth-header': this.token.getValue()
  //       })
  //     });
  // }

  public save(): void {
    this._storage.put("VORTEX.USER.TOKEN", this.token.getValue());
    this._storage.put("VORTEX.USER.USER", JSON.stringify(this.user));
    this._storage.put("VORTEX.USER.EXPIRE", this.tokenExpiration.getValue().toJSON());
  }

  public logout(): void {
    this.token.next('');
    this.tokenExpiration.next(undefined);
    this.user.next(undefined);
    this._storage.clear();
    this._router.navigateByUrl('/auth/login');
  }
}
