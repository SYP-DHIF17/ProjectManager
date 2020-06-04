import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.styl']
})
export class AddProjectComponent implements OnInit {

    name: string = '';
    description: string = '';
    budget: number = 0;
    leader: string = '';
    startDate: string = '';
    endDate: string = '';
    addMember: string = '';
    members: string[] = [];

    constructor() {

    }

    ngOnInit(): void {

    }

    public addMemberToProject(): void {
        this.members.push(this.addMember);
        this.addMember = '';
    }

    public removeMember(member: string): void {
        this.members.splice(this.members.indexOf(member), 1);
    }

    public createProject(): void {
        
    }
}
