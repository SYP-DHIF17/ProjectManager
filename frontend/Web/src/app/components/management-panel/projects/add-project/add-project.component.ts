import { Component, OnInit } from '@angular/core';
import { DialogService } from 'app/providers/dialog/dialog.service';
import { DataService, LoaderService } from '@providers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.styl']
})
export class AddProjectComponent implements OnInit {

  name: string = '';
  budget: number = 0;
  startDate: string = '';
  endDate: string = '';
  addMember: string = '';
  members: string[] = [];

  constructor(private _dialog: DialogService, private _data: DataService, private _router: Router, private _loader: LoaderService) {
  }

  ngOnInit(): void {

  }
  public createProject(): void {
    if (!(this.name || this.budget == 0 || this.startDate || this.endDate)) {
      this._dialog.dialog.show(
        "error",
        "Missing fields",
        "You forgot to fill out some fields!"
      );
    }

    this._loader.setVisible(true);
  
    const { name, budget, startDate, endDate } = this;

    const start = new Date(startDate);
    const end = new Date(endDate);

    this._data.createProject({
      name,
      overallBudget: budget,
      plannedEndDate: end,
      startDate: start
    }, (projectID) => {
      this._loader.setVisible(false);
      this._dialog.notification.show('success', 'Erfolg', 'Das Projektr wurde erfolgreich erstellt!');
      this._router.navigate(['/project', projectID]);
    });
  }
}
