import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DialogComponent } from '@components/shared/dialog/dialog.component';
import { NotificationPopUpComponent } from '@components/shared/notification-pop-up/notification-pop-up.component';
import { LoaderService } from '@providers';
import { DialogService } from '@providers/dialog/dialog.service';

@Component({
  selector: 'app-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.styl']
})
export class ManagementPanelComponent implements OnInit, AfterViewInit {

  @ViewChild(DialogComponent) public dialog: DialogComponent;
  @ViewChild(NotificationPopUpComponent) public notificationPopUp: NotificationPopUpComponent;

  constructor(private dialogService: DialogService, private _loader: LoaderService){
    
  }

  ngOnInit(): void{
     this._loader.setVisible(false);
  }

  ngAfterViewInit(): void {
    this.dialogService.dialog = this.dialog;
    this.dialogService.notification = this.notificationPopUp;
    this.dialogService.notification.close();
  }
}
