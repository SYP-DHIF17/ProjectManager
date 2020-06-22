import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService, LoaderService } from '@providers';
import { combineLatest, Observable } from 'rxjs';
import { DialogService } from 'app/providers/dialog/dialog.service';
import { AddMemberToTeamResponse } from '@shared';
import { forkJoin } from 'rxjs';

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
    private dialogService: DialogService,
    private loaderService: LoaderService) {

  }

  ngOnInit(): void {
    this.projectID = this.route.snapshot.paramMap.get('id');
  }

  public addMember(): void {
    if (this.memberEmail == '') return;

    this.members.push(this.memberEmail);
    this.memberEmail = '';
  }

  public removeMember(member: string): void {
    this.members.splice(this.members.indexOf(member), 1);
  }

  public createTeam(): void {
    this.loaderService.setVisible(true);
    this.dataService.createTeam(this.projectID, {
      name: this.teamName
    }, (teamID: string) => {
      let requests = [];

      this.members.forEach((member: string) => {
        const subscription = this.dataService.addTeamMember(teamID, {
          user: member
        });

        requests.push(subscription);
      });
     
      setTimeout(() => {
        this.loaderService.setVisible(false);
        this.router.navigateByUrl('project/' + this.projectID);
        this.dialogService.notification.show('success', 'Erfolg', 'Das Team wurde erfolgreich erstellt!');
      }, 500);
    });
  }

  public cancel(): void {
    this.router.navigateByUrl('project/' + this.projectID);
  }
}