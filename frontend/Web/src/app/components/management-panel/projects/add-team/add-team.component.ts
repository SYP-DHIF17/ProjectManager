import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@providers';
import { combineLatest } from 'rxjs';
import { AddMemberToTeamResponse } from '@shared';
import { DialogService } from 'app/providers/dialog/dialog.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.styl']
})
export class AddTeamComponent implements OnInit {

  projectID: string = '';
  teamName: string = '';
  members: string[] = [];
  memberEmail: string = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService,
              private dialogService: DialogService) {
    
  }

  ngOnInit(): void {
    this.projectID = this.route.snapshot.paramMap.get('id');
  }

  public addMember(): void {
      if(this.memberEmail == '') return;

      this.members.push(this.memberEmail);
      this.memberEmail = '';
  }

  public removeMember(member: string): void {
      this.members.splice(this.members.indexOf(member), 1);
  }

  public createTeam(): void {
    this.dataService.createTeam(this.projectID, {
        name: this.teamName
    }, (teamID: string) => {
        let requests = [];

        this.members.forEach((member: string) => {
            const subscription = this.dataService.addTeamMember(teamID, {
                user: member
            });

            requests.push(subscription);
            combineLatest(requests, (res: AddMemberToTeamResponse) => {
                //TODO: team successfully created
            });
        });
    });
  }

  public cancel(): void {
    this.router.navigateByUrl('project/' + this.projectID);
  }
}