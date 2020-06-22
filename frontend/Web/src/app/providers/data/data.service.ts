import { Injectable } from '@angular/core';
import { Project, User, Team, ProjectPart, Workpackage, Milestone } from '@models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLS, DefaultResponse, CreateMileStone, UpdateMileStone, AddTeamMemberRequest, ProjectPartResponse } from '@shared';
import { UserService } from '../user/user.service';
import { CreateProjectRequest, UpdateUserRequest, UpdateProjectRequest, CreateTeamRequest, UpdateTeamRequest, AddProjectPart, UpdateProjectPart, AddWorkPackage, UpdateWorkPackage } from '@shared';
import { map } from 'rxjs/operators';
import { DialogService } from '@providers/dialog/dialog.service';
import { LoaderService } from '@providers/loader/loader.service';

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

  constructor(private _http: HttpClient, private _user: UserService, private _dialog: DialogService, private _loader: LoaderService) {
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
        for(let project of projects) {
          project.startDate = new Date(project.startDate);
          project.plannedEndDate = new Date(project.plannedEndDate);
          project.realEndDate = new Date(project.realEndDate);
        }
        this.projects.next(projects);
        then();
        s.unsubscribe();
      }, this.errorHandler);
  }

  createProject(request: CreateProjectRequest, then = (projectID: string) => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.post(URLS.PROJECTS.ALL, request, { headers })
      .subscribe((res: DefaultResponse) => {
        s.unsubscribe();
        const startDate = new Date(request.startDate);
        const plannedEndDate = new Date(request.plannedEndDate);
        const project: Project = { name: request.name, overallBudget: request.overallBudget, startDate, plannedEndDate: plannedEndDate, realEndDate: null, projectID: res.id, leaderID: this._user.user.getValue().userId };
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

    const s = this._http.post(URLS.TEAMS.ID(teamID), request, { headers })
      .subscribe(() => {
        then();
      }, this.errorHandler);

      return s;
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

  addProjectPart(projectID: string, request: AddProjectPart, then = (id: string) => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.post(URLS.PROJECTPARTS.ADD, request, { headers })
      .subscribe((res: DefaultResponse) => {
        s.unsubscribe();
        then(res.id);
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

  addTeamToProjectPart(teamName: string, partID: string, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.post(URLS.PROJECTPARTS.WITHTEAM(partID, teamName), {}, { headers })
      .subscribe(() => {
        s.unsubscribe();
        then();
      }, this.errorHandler);

      return s;
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
        const reachDate = new Date(request.reachDate);
        const milestone: Milestone = { name: request.name, reachDate, description: request.description, milestoneId: res.id, projectPartId: partID };
        this.milestones.next([...this.milestones.getValue(), milestone])
        then(res.id);
      });

      return s;
  }

  changeMileStone(milestoneID: string, request: UpdateMileStone, then = () => { }) {
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
        const workpackage: Workpackage = { name: request.name,
            description: request.description, 
            startDate: new Date(request.startDate),  
            plannedEndDate: new Date(request.plannedEndDate),
            realEndDate: null,
            workpackageId: res.id };
        this.packages.next([...this.packages.getValue(), workpackage]);
      }, this.errorHandler);

      return s;
  }

  changeWorkPackage(workpackageID: string, request: UpdateWorkPackage, then = () => { }) {
    if (!this._user.isLoggedIn()) return;

    const s = this._http.put(URLS.WORKPACKAGES.ID(workpackageID), request, { headers })
      .subscribe(() => {
        s.unsubscribe();
        then();
      }, this.errorHandler);
  }

  getAllProjectPartsForProject(projectID: string, then = (res: ProjectPartResponse[]) => { }){
    if (!this._user.isLoggedIn()) return;
    console.log("URL -> " + URLS.PROJECTS.PARTS(projectID))
    const s = this._http.get(URLS.PROJECTS.PARTS(projectID), { headers })
    .subscribe((res: ProjectPartResponse[]) => {
      s.unsubscribe();
      then(res);
    }, this.errorHandler);
  }

  errorHandler(err: any) {
    // this._loader.setVisible(false);
    /*this._dialog.dialog.show(
      "error",
      "Server Error",
      "An server error occured! Please contact the admin and send him the output in the console. (Ctrl+Shift+I to open the developer console)"
    );*/
    console.error(JSON.stringify(err));
  }

  getObservableProjects(): Observable<Project[]> {
    return of(this.projects.getValue());
  }

  getProjectFromID(id: string) {
    return this.getObservableProjects()
      .pipe(
        map(projects => projects.find(project => project.projectID === id))
      );
  }
}
