import { Injectable } from '@angular/core';
import { Project, User, Team, ProjectPart, Workpackage } from '@models';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLS } from '@shared';
import { UserService } from '../user/user.service';
import { CreateProjectRequest, ChangeUserRequest, ChangeProjectRequest, CreateTeamRequest, UpdateTeamRequest, AddTeamMemberRequest, AddProjectPart, ChangeProjectPart, AddWorkPackage, ChangeWorkPackage } from 'app/shared/requests';

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

  createProject(project: CreateProjectRequest, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.post(URLS.PROJECTS.ALL, project, { headers })
      .subscribe(() => {
        s.unsubscribe();
        then();
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

  createTeam(projectID: string, request: CreateTeamRequest, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.post(URLS.TEAMS.ALL(projectID), request, { headers })
      .subscribe(() => {
        s.unsubscribe();
        then();
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

    const s = this._http.post(URLS.TEAMS.ID(teamID), request, { headers })
      .subscribe(() => {
        s.unsubscribe();
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

  addProjectPart(projectID: string, part: AddProjectPart, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.post(URLS.PROJECTPARTS.ALL(projectID), part, { headers })
      .subscribe(() => {
        s.unsubscribe();
        then();
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

  addTeamToProject(teamID: string, partID: string, then = () => { }) {
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
      }, this.errorHandler);
  }

  createWorkPackage(partID: string, workpackage: AddWorkPackage, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.post(URLS.WORKPACKAGES.ALL(partID), workpackage, { headers })
      .subscribe(() => {
        s.unsubscribe();
        then();
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
    // this._dialog.dialog.show(
    //   "error",
    //   "Server Error",
    //   "An server error occured! Please contact the admin and send him the output in the console."
    // );
    // TODO implement the dialog
    console.error(JSON.stringify(err));
  }
}
