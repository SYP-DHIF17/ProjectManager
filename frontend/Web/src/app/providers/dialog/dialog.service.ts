import { Injectable } from '@angular/core';
import { DialogComponent } from '@components/shared/dialog/dialog.component';
import { NotificationPopUpComponent } from '@components/shared/notification-pop-up/notification-pop-up.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public dialog: DialogComponent;
  public notification: NotificationPopUpComponent

  constructor(){

  }
}
