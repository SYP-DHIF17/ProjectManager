import { Component, OnInit } from '@angular/core';
import { Workpackage, Milestone } from '@models';
import { DialogService } from 'app/providers/dialog/dialog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-project-part',
    templateUrl: './add-project-part.component.html',
    styleUrls: ['./add-project-part.component.styl']
})
export class AddProjectPartComponent implements OnInit {
    name: string = '';
    position: number = 1;
    workpackages: { data: Workpackage, selected: boolean }[] = [
        {
            data: {
                name: 'Arbeitspaket hinzufügen...',
                description: '',
                plannedEnddate: null,
                realEnddate: null,
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
        private route: ActivatedRoute) {
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
                plannedEndDate: entry.data.plannedEnddate.toISOString().split('T')[0],
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
                        plannedEnddate: endDate,
                        startDate: startDate,
                        workpackageId: null,
                        realEnddate: null,
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
                    entry.plannedEnddate = endDate;
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

    }
}
