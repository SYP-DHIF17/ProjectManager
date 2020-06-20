import { Component, OnInit } from '@angular/core';
import { Workpackage, Milestone } from '@models';
import { DialogService } from 'app/providers/dialog/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, LoaderService } from '@providers';
import { combineLatest } from 'rxjs';
import { Route } from '@angular/compiler/src/core';

@Component({
    selector: 'app-add-project-part',
    templateUrl: './add-project-part.component.html',
    styleUrls: ['./add-project-part.component.styl']
})
export class AddProjectPartComponent implements OnInit {
    name: string = '';
    position: number = 1;
    teams: string[] = [];
    teamToAdd: string = '';
    workpackages: { data: Workpackage, selected: boolean }[] = [
        {
            data: {
                name: 'Arbeitspaket hinzufügen...',
                description: '',
                plannedEndDate: null,
                realEndDate: null,
                startDate: null,
                workpackageId: 'add'
            },
            selected: true
        }
    ];
    milestones: { data: Milestone, selected: boolean }[] = [
        {
            data: {
                name: 'Meilenstein hinzufügen...',
                description: '',
                milestoneId: 'add',
                projectPartId: null,
                reachDate: null
            },
            selected: true
        }
    ];

    editableWorkpackage: {
        name: string,
        description: string;
        startDate: string,
        plannedEndDate: string;
    } = {
            name: '',
            description: '',
            plannedEndDate: new Date().toISOString().split('T')[0],
            startDate: new Date().toISOString().split('T')[0],
        };

    editableMilestone: {
        name: string,
        description: string,
        reachDate: string
    } = {
            name: '',
            description: '',
            reachDate: new Date().toISOString().split('T')[0],
        };

    private projectId: string = null;

    constructor(private dialogService: DialogService,
        private route: ActivatedRoute,
        private dataService: DataService,
        private loaderService: LoaderService,
        private router: Router) {
        this.projectId = route.snapshot.queryParams['id'];
        console.log(this.projectId);
    }

    ngOnInit(): void {

    }

    onChangeSelectionForWorkpackage(entry: { data: Workpackage, selected: boolean }): void {
        this.workpackages.forEach(e => e.selected = false);
        entry.selected = true;

        if (entry.data.workpackageId == 'add') {
            this.editableWorkpackage = {
                name: '',
                description: '',
                plannedEndDate: new Date().toISOString().split('T')[0],
                startDate: new Date().toISOString().split('T')[0],
            };
        } else {
            this.editableWorkpackage = {
                name: entry.data.name,
                description: entry.data.description,
                plannedEndDate: entry.data.plannedEndDate.toISOString().split('T')[0],
                startDate: entry.data.startDate.toISOString().split('T')[0],
            };
        }
    }

    onDeleteWorkpackage(entry: { data: Workpackage, selected: boolean }): void {
        let idx: number = this.workpackages.indexOf(entry);
        this.workpackages.splice(idx, 1);

        if (!this.workpackages[0].selected) {
            this.onChangeSelectionForWorkpackage(this.workpackages[idx - 1]);
        }
    }

    onChangeSelectionForMilestones(entry: { data: Milestone, selected: boolean }): void {
        this.milestones.forEach(e => e.selected = false);
        entry.selected = true;
        console.log(entry)
        if (entry.data.milestoneId == 'add') {
            this.editableMilestone = {
                name: '',
                description: '',
                reachDate: new Date().toISOString().split('T')[0],
            };
        } else {
            this.editableMilestone = {
                name: entry.data.name,
                description: entry.data.description,
                reachDate: entry.data.reachDate.toISOString().split('T')[0]
            };
        }
    }

    onDeleteMilestone(entry: { data: Milestone, selected: boolean }): void {
        let idx: number = this.milestones.indexOf(entry);
        this.milestones.splice(idx, 1);

        if (!this.milestones[0].selected) {
            this.onChangeSelectionForMilestones(this.milestones[idx - 1]);
        }
    }

    onAddTeam(): void{
        if(this.teamToAdd == '') return;
        if(this.teams.includes(this.teamToAdd)){
            this.dialogService.dialog.show('error',
                                            'Ungültiger Eintrag',
                                            'Dieses Team wurde schon hinzugefügt!');
            return;
        }

        this.teams.push(this.teamToAdd);
        this.teamToAdd = '';
    }

    onDeleteTeam(team: string): void {
        this.teams.splice(this.teams.indexOf(team));
    }

    onSaveWorkpackage(): void {
        let startDate: Date = new Date(this.editableWorkpackage.startDate);
        let endDate: Date = new Date(this.editableWorkpackage.plannedEndDate);

        if (this.editableWorkpackage.name == '') {
            this.dialogService.dialog.show(
                'error',
                'Fehlender Wert',
                'Der Name eines Arbeitspaketes muss angegebenen werden!');
            return;
        }

        if (startDate > endDate) {
            this.dialogService.dialog.show(
                'error',
                'Ungültiger Wert',
                'Das Start-Datum kann nicht nach dem End-Datum sein!');
            return;
        }

        //check whether user is editing an existing workpackage or creating a new one
        if (this.workpackages[0].selected) {
            //create new one
            this.workpackages.push(
                {
                    data: {
                        name: this.editableWorkpackage.name,
                        plannedEndDate: endDate,
                        startDate: startDate,
                        workpackageId: null,
                        realEndDate: null,
                        description: this.editableWorkpackage.description
                    },
                    selected: false
                });

            this.onChangeSelectionForWorkpackage(this.workpackages[0]);
        } else {
            //edit existing one
            for (let i = 0; i < this.workpackages.length; i++) {
                if (this.workpackages[i].selected) {
                    let entry: Workpackage = this.workpackages[i].data;
                    entry.name = this.editableWorkpackage.name;
                    entry.plannedEndDate = endDate;
                    entry.startDate = startDate;
                    break;
                }
            }
        }
    }

    onSaveMilestone(): void {
        let reachDate: Date = new Date(this.editableMilestone.reachDate);

        if (this.editableMilestone.name == '') {
            this.dialogService.dialog.show(
                'error',
                'Fehlender Wert',
                'Der Name eines Meilensteines muss angegebenen werden!');
            return;
        }

        //check whether user is editing an existing workpackage or creating a new one
        if (this.milestones[0].selected) {
            //create new one
            this.milestones.push(
                {
                    data: {
                        name: this.editableMilestone.name,
                        description: this.editableMilestone.description,
                        milestoneId: null,
                        reachDate: reachDate,
                        projectPartId: null
                    },
                    selected: false
                });

            this.onChangeSelectionForMilestones(this.milestones[0]);
        } else {
            //edit existing one
            for (let i = 0; i < this.milestones.length; i++) {
                if (this.milestones[i].selected) {
                    let entry: Milestone = this.milestones[i].data;
                    entry.name = this.editableMilestone.name;
                    entry.description = this.editableMilestone.description;
                    entry.reachDate = reachDate;
                    break;
                }
            }
        }
    }

    onSave(): void {
        if(name == ''){
            this.dialogService.dialog.show(
                'error',
                'Fehlender Wert',
                'Der Name eines Projekt-Abschnitts muss angegeben werden!');
            return;
        }

        if(this.workpackages.length == 0){
            this.dialogService.dialog.show(
                'error',
                'Fehlender Wert',
                'Ein Projekt-Abschnitt muss mindestens einem Team zugewiesen werden!');
            return;
        }

        if(this.workpackages.length <= 1){
            this.dialogService.dialog.show(
                'error',
                'Fehlender Wert',
                'Ein Projekt-Abschnitt muss mindestens ein Arbeitspaket beinhalten!');
            return;
        }

        if(this.milestones.length <= 1){
            this.dialogService.dialog.show(
                'error',
                'Fehlender Wert',
                'Ein Projekt-Abschnitt muss mindestens einen Meilenstein beinhalten!');
            return;
        }

        this.loaderService.setVisible(true);
        
        //create project part
        this.dataService.addProjectPart(this.projectId, {
            name: this.name,
            position: this.position
        }, (partId: string) => {
            let workpackageRequests = [];
            //create workpackages
            this.workpackages.forEach(entry => {
                let w: Workpackage = entry.data;
                const req = this.dataService.createWorkPackage(partId, {
                    name: w.name,
                    description: w.description,
                    plannedEndDate: w.plannedEndDate,
                    realEndDate: w.realEndDate,
                    startDate: w.startDate
                });
                workpackageRequests.push(req);  
            });

            //wait for all workpackages to be created
            combineLatest(workpackageRequests, () => {
                let milestoneRequests = [];
                //create all milestones
                this.milestones.forEach(entry => {
                    let m: Milestone = entry.data;
                    const req = this.dataService.addMileStone(partId, {
                        name: m.name,
                        description: m.description,
                        reachDate: m.reachDate,
                    });
                    milestoneRequests.push(req);
                });

                //wait for all milestones to be created
                combineLatest(milestoneRequests, () => {
                    //add teams to projkect part
                    let teamRequests = [];
                    this.teams.forEach(t => {
                        const req = this.dataService.addTeamToProjectPart(t, partId);
                        teamRequests.push(req);
                    });

                    //wait for all teams to be created
                    combineLatest(teamRequests, () => {
                        //process finished!
                        this.loaderService.setVisible(false);
                        this.router.navigateByUrl('project/' + this.projectId);
                        this.dialogService.notification.show('success', 
                                                            'Erfolg',
                                                            'Der Projekt-Abschnitt wurde erfolgreich erstellt!');
                    });
                });
            });
        });
    }
}
