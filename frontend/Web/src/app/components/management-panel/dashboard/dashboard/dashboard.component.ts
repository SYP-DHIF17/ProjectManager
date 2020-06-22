import { Component, OnInit } from '@angular/core';
import { Project } from '@models';
import { DataService, LoaderService } from '@providers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {

  public projects: Project[] = [];

  constructor(private _data: DataService, private _loader: LoaderService) { }

  ngOnInit() {
    this._loader.setVisible(true);
    this._data.projects.subscribe(projects => this.projects = projects);
    this._data.getProjects(() => this._loader.setVisible(false));
  }

}