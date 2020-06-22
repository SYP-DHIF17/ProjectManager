import { Component, OnInit } from '@angular/core';
import { DataService } from '@providers';
import { Project } from '@models';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.styl']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this._data.projects.subscribe(projects => this.projects = projects);
  }

  public onSelectProject(): void {

  }
}
