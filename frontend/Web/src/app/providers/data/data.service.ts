import { Injectable } from '@angular/core';
import { Project, User, Team, ProjectPart, Workpackage } from '@models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLS, DefaultResponse } from '@shared';
import { UserService } from '../user/user.service';
import { CreateProjectRequest, ChangeUserRequest, ChangeProjectRequest, CreateTeamRequest, UpdateTeamRequest, AddTeamMemberRequest, AddProjectPart, ChangeProjectPart, AddWorkPackage, ChangeWorkPackage } from '@shared';
import { map } from 'rxjs/operators';
import { DialogService } from '@providers/dialog/dialog.service';

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
  public teams: BehaviorSubject<Team[]> = new BehaviorSubject([]);
  public parts: BehaviorSubject<ProjectPart[]> = new BehaviorSubject([]);
  public packages: BehaviorSubject<Workpackage[]> = new BehaviorSubject([]);

  constructor(private _http: HttpClient, private _user: UserService, private _dialog: DialogService) {
    // handle the login token
    _user.token.subscribe((token) => {
      if (token) {
        headers = headers.set("auth-header", token);
      } else {
        headers = headers.delete("auth-header");
      }
    })
  }

  getUserInfo(then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.get(URLS.USER.INFO, { headers })
      .subscribe((res: User) => {
        this._user.user.next(res);
        s.unsubscribe();
        then();
      }, this.errorHandler);
  }

  changeSelf(newUser: ChangeUserRequest, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.put(URLS.USER.INFO, newUser, { headers })
      .subscribe(() => {
        s.unsubscribe();
        then()
      }, this.errorHandler);
  }

  getUserByID(id: string, then = (user: User) => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.get(URLS.USER.ID(id), { headers })
      .subscribe((res: User) => {
        s.unsubscribe();
        then(res);
      }, this.errorHandler);
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

  createProject(request: CreateProjectRequest, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.post(URLS.PROJECTS.ALL, request, { headers })
      .subscribe((res: DefaultResponse) => {
        s.unsubscribe();
        then();
        const project: Project = { ...request, projectId: res.id, leaderID: this._user.user.getValue().userId };
        this.projects.next([...this.projects.getValue(), project])
      }, this.errorHandler);
  }

  changeProject(id: string, request: ChangeProjectRequest, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.put(URLS.PROJECTS.ID(id), request, { headers })
      .subscribe(() => {
        s.unsubscribe();
        then();
      }, this.errorHandler)
  }

  getTeams(projectID: string, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.get(URLS.TEAMS.ALL(projectID), { headers })
      .subscribe((teams: Team[]) => {
        this.teams.next(teams);
        s.unsubscribe();
        then();
      }, this.errorHandler);
  }

  createTeam(projectID: string, request: CreateTeamRequest, then = (teamID: string) => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.post(URLS.TEAMS.ALL(projectID), request, { headers })
      .subscribe((res: DefaultResponse) => {
        s.unsubscribe();
        then(res.id);
        const team: Team = { ...request, teamID: res.id }
        this.teams.next([...this.teams.getValue(), team]);
      }, this.errorHandler);
  }

  changeTeam(teamID: string, request: UpdateTeamRequest, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.put(URLS.TEAMS.ID(teamID), request, { headers })
      .subscribe(() => {
        s.unsubscribe();
        then();
      }, this.errorHandler);
  }

  addTeamMember(teamID: string, request: AddTeamMemberRequest, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    return this._http.post(URLS.TEAMS.ID(teamID), request, { headers })
      .subscribe(() => {
        then();
      }, this.errorHandler);
  }

  getProjectParts(projectID: string, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.get(URLS.PROJECTPARTS.ALL(projectID), { headers })
      .subscribe((parts: ProjectPart[]) => {
        this.parts.next(parts);
        s.unsubscribe();
        then();
      }, this.errorHandler);
  }

  addProjectPart(projectID: string, request: AddProjectPart, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.post(URLS.PROJECTPARTS.ALL(projectID), request, { headers })
      .subscribe((res: DefaultResponse) => {
        s.unsubscribe();
        then();
        const part: ProjectPart = { ...request, projectPartID: res.id };
        this.parts.next([...this.parts.getValue(),])
      }, this.errorHandler);
  }

  changeProjectPart(partID: string, request: ChangeProjectPart, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.put(URLS.PROJECTPARTS.ID(partID), request, { headers })
      .subscribe(() => {
        s.unsubscribe();
        then();
      }, this.errorHandler);
  }

  addTeamToProjectPart(teamID: string, partID: string, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.post(URLS.PROJECTPARTS.WITHTEAM(partID, teamID), {}, { headers })
      .subscribe(() => {
        s.unsubscribe();
        then();
      }, this.errorHandler);
  }

  getWorkPackages(partID: string, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.get(URLS.WORKPACKAGES.ALL(partID), { headers })
      .subscribe((packages: Workpackage[]) => {
        s.unsubscribe();
        then();
        this.packages.next(packages);
      }, this.errorHandler);
  }

  createWorkPackage(partID: string, request: AddWorkPackage, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.post(URLS.WORKPACKAGES.ALL(partID), request, { headers })
      .subscribe((res: DefaultResponse) => {
        s.unsubscribe();
        then();
        const workpackage: Workpackage = { ...request, workpackageId: res.id };
        this.packages.next([...this.packages.getValue(), workpackage]);
      }, this.errorHandler);
  }

  changeWorkPackage(workpackageID: string, request: ChangeWorkPackage, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.put(URLS.WORKPACKAGES.ID(workpackageID), request, { headers })
      .subscribe(() => {
        s.unsubscribe();
        then();
      }, this.errorHandler);
  }

  errorHandler(err: any) {
    this._dialog.dialog.show(
      "error",
      "Server Error",
      "An server error occured! Please contact the admin and send him the output in the console. (Ctrl+Shift+I to open the developer console)"
    );
    console.error(JSON.stringify(err));
  }

  getObservableProjects(): Observable<Project[]> {
    return of(this.projects.getValue());
  }

  getProjectFromID(id: string) {
    return this.getObservableProjects()
      .pipe(
        map(projects => projects.find(project => project.projectId === id))
      );
  }
}
