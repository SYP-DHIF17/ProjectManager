import { Component, OnInit } from '@angular/core';
import { Project } from '@models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {

  public projects: Project[] = [];

  constructor() { }

  ngOnInit() {
  }

}
