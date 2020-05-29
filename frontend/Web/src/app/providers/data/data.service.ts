import { Injectable } from '@angular/core';
import { Project } from '@models';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLS } from '@shared';

const header = new HttpHeaders({
  "Content-Type": "application/json; charset=utf-8",
  // "auth-header": this._userService.token,
  "Access-Control-Allow-Origin": "*",
})

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public projects: BehaviorSubject<Project[]> = new BehaviorSubject([]);

  constructor(private _http: HttpClient) { }

  getProjects(then = () => { }) {
    // const s = this._http
    //   .get(URLS)
  }
}
