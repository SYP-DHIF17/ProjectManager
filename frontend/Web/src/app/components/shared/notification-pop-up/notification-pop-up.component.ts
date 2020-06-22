import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification-pop-up',
  templateUrl: './notification-pop-up.component.html',
  styleUrls: ['./notification-pop-up.component.styl']
})
export class NotificationPopUpComponent implements OnInit {

  type: string = "success";
  isVisible: boolean = false;
  title: string = '';
  text: string = '';

  dialogFadeOutTime: number = 10 * 1000;

  constructor(){

  }

  ngOnInit(): void{

  }

  public show(type: string, title: string, text: string): void{
    this.type = type;
    this.title = title;
    this.text = text;
    this.isVisible = true;

    setTimeout(() => {
      this.isVisible = false;
    }, this.dialogFadeOutTime);
  }

  public close(): void{
    this.isVisible = false;
  }
}
