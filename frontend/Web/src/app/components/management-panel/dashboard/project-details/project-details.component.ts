import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { DataService } from '@providers';
import { Project } from '@models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.styl']
})
export class ProjectDetailsComponent implements OnInit {

  public project: Project;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _data: DataService
  ) { }

  ngOnInit(): void {
    this._route.paramMap.pipe(
      switchMap(params => {
        const projects = this._data.projects.getValue();
        for (const project of projects) {
          if (project.projectId == params.get("id")) {
            this.project = project;
          }
        }
        return new Observable(null);
      })
    );
  }

}
