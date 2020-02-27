import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.styl']
})
export class CalendarComponent implements OnInit, OnDestroy {
  time: Date;
  timeUpdate: any;

  constructor(){

  }

  ngOnInit(): void{
    this.time = new Date();
    this.timeUpdate = setInterval((): void => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timeUpdate);
  }
}
