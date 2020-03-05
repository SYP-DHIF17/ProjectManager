import { Component, OnInit, OnDestroy, Input } from '@angular/core';

export type CalendarSize = "small" | "large";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.styl']
})
export class CalendarComponent implements OnInit, OnDestroy {
  time: Date;
  timeUpdate: any;

  @Input()
  size: CalendarSize

  constructor() {

  }

  ngOnInit(): void {
    this.time = new Date();
    this.timeUpdate = setInterval((): void => {
      this.time = new Date();
    }, 900);
  }

  ngOnDestroy(): void {
    clearInterval(this.timeUpdate);
  }

  getCurrentDay(): string {
    return this.time.toLocaleDateString("de-DE", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour12: false,
      hour: "numeric",
      minute: "numeric"
    });
  }
}
