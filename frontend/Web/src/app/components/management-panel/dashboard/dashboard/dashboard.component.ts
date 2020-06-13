import { Component, OnInit } from '@angular/core';
import { Project } from '@models';
import { DataService } from '@providers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {

  public projects: Project[] = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.projects.subscribe(projects => this.projects = projects);
    this._data.getProjects();
  }

}
