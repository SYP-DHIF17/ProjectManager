import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { DataService } from '@providers';
import { Project, Team, Workpackage, ProjectPart, Milestone } from '@models';
import { Observable } from 'rxjs';
import { ProjectPartResponse } from '@shared';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.styl']
})
export class ProjectDetailsComponent implements OnInit {

  public project: Project;
  public teams: Team[];
  public parts: ProjectPart[];
  public packages: Workpackage[];
  public milestones: Milestone[];
  public projectParts: {
    readonly projectPartID: string;
    name: string;
    position: number;
    entries: {
      id: string;
      name: string;
      description: string;
      startDate: Date;
      plannendEndDate: Date;
      endDate: Date;
      sortDate: Date;
      isMilestone: boolean;
    }[];
  }[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _data: DataService
  ) {
      /*
        Test Data
      this.project = <any>{
        name: "Hello World",
        startDate: new Date(),
        plannedEndDate: new Date(),
        overallBudget: 1000
      };

      this.teams = [
        {
            name: "Alpha",
            teamID: null
        },
        {
            name: "Beta",
            teamID: null
        }
      ];

      this.projectParts = [
        {
            name: "Abschnitt 1",
            position: 1,
            projectPartID: null,
            entries: [
                {
                    name: "This is the name",
                    description: "This is the description",
                    endDate: null,
                    startDate: new Date(),
                    sortDate: new Date(),
                    id: null,
                    isMilestone: false,
                    plannendEndDate: new Date()
                },
                {
                    name: "This is the name",
                    description: "This is the description",
                    plannendEndDate: new Date(),
                    startDate: null,
                    sortDate: new Date(),
                    id: null,
                    isMilestone: true,
                    endDate: null
                }
            ]
        },
        {
            name: "Abschnitt 1",
            position: 1,
            projectPartID: null,
            entries: [
                {
                    name: "This is the name",
                    description: "This is the description",
                    endDate: null,
                    startDate: new Date(),
                    sortDate: new Date(),
                    id: null,
                    isMilestone: false,
                    plannendEndDate: new Date()
                },
                {
                    name: "This is the name",
                    description: "This is the description",
                    plannendEndDate: new Date(),
                    startDate: null,
                    sortDate: new Date(),
                    id: null,
                    isMilestone: true,
                    endDate: null
                }
            ]
        }
      ];*/
  }

  ngOnInit(): void {
    this._route.paramMap.pipe(
      switchMap(params => this._data.getProjectFromID(params.get("id")))
    ).subscribe(project => {
      this.project = project;
      this._data.getTeams(this.project.projectID);

      this._data.teams.subscribe(teams => {
        this.teams = teams;
      });
      this._data.getAllProjectPartsForProject(this.project.projectID, (res: ProjectPartResponse[]) => {
        //also contains "selected" field
        console.log(res)
        res.forEach(e => {
          const entry = {
            projectPartID: e.projectPartID,
            name: e.name,
            position: e.position,
            entries: []
          };

          e.workpackages.forEach(w => {
            entry.entries.push({
              id: w.workpackageId,
              name: w.name,
              description: w.description,
              startDate: new Date(w.startDate),
              plannedEndDate: new Date(w.plannedEndDate),
              endDate: new Date(w.plannedEndDate),
              sortDate: new Date(w.startDate),
              isMilestone: false
            });
          });

          e.milestones.forEach(m => {
            entry.entries.push({
              id: m.milestoneId,
              name: m.name,
              description: m.description,
              startDate: null,
              plannedEndDate: new Date(m.reachDate),
              endDate: null,
              sortDate: new Date(m.reachDate),
              isMilestone: true
            });
          });

          entry.entries.sort((a, b) => a.sortDate.getTime() - b.sortDate.getTime());

          this.projectParts.push(entry);
        });
      });
    });
  }

  addTeam() {
    // project/:id/teams/add
    this._router.navigate(['/project', this.project.projectID, 'teams', 'add']);
  }

  onChangeSelection(entry: any): void {
      entry.selected = !entry.selected;

      if(entry.selected){
          entry.endDate = new Date();
      }else{
          entry.endDate = null;
      }
  }
}
