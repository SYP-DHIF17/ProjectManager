import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { DataService } from '@providers';
import { Project, Team, Workpackage, ProjectPart, Milestone } from '@models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.styl']
})
export class ProjectDetailsComponent implements OnInit {

  public project: Project;
  public teams: Team[];
  public parts: ProjectPart[];
  public packages: Workpackage[];
  public milestones: Milestone[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _data: DataService
  ) { }

  ngOnInit(): void {
    this._route.paramMap.pipe(
      switchMap(params => this._data.getProjectFromID(params.get("id")))
    ).subscribe(project => {
      this.project = project;
      this._data.getTeams(this.project.projectId);
    });
    this._data.teams.subscribe(teams => {
      this.teams = teams;
    });
    this._data.parts.subscribe(parts => {
      this.parts = parts;
    })
    this._data.packages.subscribe(packages => {
      this.packages = packages;
    });
    this._data.milestones.subscribe(milestones => {
      this.milestones = milestones;
    })
  }

}
