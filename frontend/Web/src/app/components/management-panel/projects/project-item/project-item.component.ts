import { Component, OnInit, Input } from '@angular/core';
import { Project } from '@models';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.styl']
})
export class ProjectItemComponent implements OnInit {

  // @Input() public projectName: string = 'Project name';
  // @Input() public projectStarted: Date = new Date();
  // @Input() public projectEnd: Date = new Date();

  @Input() public project: Project;

  constructor() { }

  ngOnInit(): void {

  }
}
