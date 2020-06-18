import { Injectable } from '@angular/core';
import { Project, User, Team, ProjectPart, Workpackage, Milestone, Milestone } from '@models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLS, DefaultResponse, CreateMileStone, UpdateMileStone } from '@shared';
import { UserService } from '../user/user.service';
import { CreateProjectRequest, UpdateUserRequest, UpdateProjectRequest, CreateTeamRequest, UpdateTeamRequest, AddTeamMemberRequest, AddProjectPart, UpdateProjectPart, AddWorkPackage, UpdateWorkPackage } from '@shared';
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
  public milestones: BehaviorSubject<Milestone[]> = new BehaviorSubject([]);

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

  changeSelf(newUser: UpdateUserRequest, then = () => { }) {
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

  createProject(request: CreateProjectRequest, then = (projectID: string) => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.post(URLS.PROJECTS.ALL, request, { headers })
      .subscribe((res: DefaultResponse) => {
        s.unsubscribe();
        const project: Project = { ...request, projectId: res.id, leaderID: this._user.user.getValue().userId };
        this.projects.next([...this.projects.getValue(), project])
        then(res.id);
      }, this.errorHandler);
  }

  changeProject(id: string, request: UpdateProjectRequest, then = () => { }) {
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
        const team: Team = { ...request, teamID: res.id }
        this.teams.next([...this.teams.getValue(), team]);
        then(res.id);
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

  changeProjectPart(partID: string, request: UpdateProjectPart, then = () => { }) {
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

  getMileStones(partID: string, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.get(URLS.MILESTONES.ID(partID), { headers })
      .subscribe((res: Milestone[]) => {
        s.unsubscribe();
        this.milestones.next(res);
        then();
      }, this.errorHandler)
  }

  addMileStone(partID: string, request: CreateMileStone, then = (milestoneID: string) => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.post(URLS.MILESTONES.ALL(partID), request, { headers })
      .subscribe((res: DefaultResponse) => {
        s.unsubscribe();
        const milestone: Milestone = { ...request, milestoneId: res.id, projectPartId: partID };
        this.milestones.next([...this.milestones.getValue(), milestone])
        then(res.id);
      })
  }

  changeMileStone(milestoneID: string, request: UpdateMileStone, then = () => void) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.put(URLS.MILESTONES.ID(milestoneID), request, { headers })
      .subscribe(() => {
        s.unsubscribe();
        then();
      }, this.errorHandler)
  }

  getWorkPackages(partID: string, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.get(URLS.WORKPACKAGES.ALL(partID), { headers })
      .subscribe((packages: Workpackage[]) => {
        s.unsubscribe();
        this.packages.next(packages);
        then();
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

  changeWorkPackage(workpackageID: string, request: UpdateWorkPackage, then = () => { }) {
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
