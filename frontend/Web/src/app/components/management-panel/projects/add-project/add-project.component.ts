import { Component, OnInit } from '@angular/core';
import { DialogService } from 'app/providers/dialog/dialog.service';
import { DataService } from '@providers';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.styl']
})
export class AddProjectComponent implements OnInit {

  name: string = '';
  description: string = '';
  budget: number = 0;
  // leader: string = '';
  startDate: string = '';
  endDate: string = '';
  addMember: string = '';
  members: string[] = [];

  constructor(private _dialog: DialogService, private _data: DataService) {

  }

  ngOnInit(): void {

  }
  public createProject(): void {
    if (!(this.name || this.description || this.budget == 0 || this.startDate || this.endDate)) {
      this._dialog.dialog.show(
        "error",
        "Missing fields",
        "You forgot to fill out some fields!"
      );
    }

    const { name, description, budget, startDate, endDate } = this;

    const start = new Date(startDate);
    const end = new Date(endDate);

    this._data.createProject({
      name,
      overallBudget: budget,
      plannedEndDate: end,
      startDate: start
    }, () => {
      // TODO get id from creating
    })
  }
}
