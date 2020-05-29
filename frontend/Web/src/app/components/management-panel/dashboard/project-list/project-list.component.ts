import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.styl']
})
export class ProjectListComponent implements OnInit {

  @Input() public className: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
