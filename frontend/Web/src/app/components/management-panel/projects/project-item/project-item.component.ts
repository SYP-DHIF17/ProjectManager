import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.styl']
})
export class ProjectItemComponent implements OnInit {

  @Input() public projectName: string = 'Project name';
  @Input() public projectStarted: Date = new Date();
  @Input() public projectEnd: Date = new Date();

  constructor() { }

  ngOnInit(): void {

  }
}
