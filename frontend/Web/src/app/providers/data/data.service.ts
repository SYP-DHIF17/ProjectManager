import { Injectable } from '@angular/core';
import { Project, User } from '@models';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLS } from '@shared';
import { UserService } from '../user/user.service';

let headers = new HttpHeaders({
  "Content-Type": "application/json; charset=utf-8",
  // "auth-header": this._userService.token,
  "Access-Control-Allow-Origin": "*",
})

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public projects: BehaviorSubject<Project[]> = new BehaviorSubject([]);

  constructor(private _http: HttpClient, private _user: UserService) {
    // handle the login token
    _user.token.subscribe((token) => {
      if (token) {
        headers = headers.set("auth-header", token);
      } else {
        headers = headers.delete("auth-header");
      }
    })
  }

  getProjects(then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.get(URLS.PROJECTS.ALL, { headers })
      .subscribe((projects: Project[]) => {
        this.projects.next(projects);
        then();
        s.unsubscribe();
      }, this.errorHandler)
  }

  errorHandler(err: any) {
    // this._dialog.dialog.show(
    //   "error",
    //   "Server Error",
    //   "An server error occured! Please contact the admin and send him the output in the console."
    // );
    // TODO implement the dialog
    console.error(JSON.stringify(err));
  }
}
