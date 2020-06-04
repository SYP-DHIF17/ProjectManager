import { Injectable } from '@angular/core';
import { Project, User } from '@models';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLS } from '@shared';

let headers = new HttpHeaders({
  "Content-Type": "application/json; charset=utf-8",
  // "auth-header": this._userService.token,
  "Access-Control-Allow-Origin": "*",
})

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: BehaviorSubject<User> = new BehaviorSubject(undefined as User);
  public projects: BehaviorSubject<Project[]> = new BehaviorSubject([]);

  constructor(private _http: HttpClient) { }

  login(username: string, password: string) {
    this._http.post(URLS.USER.LOGIN, {
      username, password
    }, { headers })
    // TODO make the login
    // .subscribe()
  }

  logout() {
    headers = headers.delete("auth-header");
    this.user.next(undefined);
  }

  getProjects(then = () => { }) {
    if (!this.user.getValue()) return;

    const s = this._http.get(URLS.PROJECTS.ALL, { headers })
      .subscribe((projects: Project[]) => {
        this.projects.next(projects);
        then();
        s.unsubscribe();
      })
  }
}
